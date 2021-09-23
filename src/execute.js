const getPackages = require("./getPackages");
const transform = require("./transform");
const checkGreen = require("./checkGreen");
const fs = require("fs");
const path = require("path");

module.exports = async function (param) {
    console.log("Scanning packages ...\n");
    const packages = await getPackages(".", param.includeDev);

    const ignoreRegex = param.ignoreRegex;
    const transformed = transform(packages, ignoreRegex ? RegExp(ignoreRegex) : undefined);

    const ignorePackages = param.ignorePackages;
    if (ignorePackages && ignorePackages.length > 0) {
        console.log("Following packages are ignored: ", ignorePackages.join());
    }
    const ignoreLicenses = param.ignoreLicenses;
    if (ignoreLicenses && ignoreLicenses.length > 0) {
        console.log("Following licenses are ignored: ", ignoreLicenses.join());
    }

    console.log("Detected licenses:");
    const detectedLicenses = Object.keys(transformed);
    console.log(`${detectedLicenses.join(", ")}\n`);

    let redLicenses = 0,
        redPackages = 0;
    for (const license of detectedLicenses) {
        if (!checkGreen(license) && !ignoreLicenses.includes(license)) {
            let packageInLicense = 0;
            for (const packageName of transformed[license]) {
                if (ignorePackages.includes(packageName)) continue;

                console.log(`Package ${packageName} with license '${license}' is red.`);
                packageInLicense++;
                redPackages++;
            }
            if (packageInLicense > 0) {
                redLicenses++;
            }
        }
    }

    if (redLicenses > 0) {
        process.exitCode = 1;

        console.log(`> ${redPackages} red packages with ${redLicenses} red licenses found.\n`);
    } else {
        console.log("> All green!\n");
    }

    if (param.writeFile) {
        console.log("Writing file ...");
        const filepath = path.resolve(param.path);
        fs.writeFileSync(filepath, JSON.stringify(transformed, null, 4));

        console.log(`File written to: ${filepath}`);
    }
};
