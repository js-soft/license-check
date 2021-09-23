const checker = require("license-checker");

module.exports = async function (workdir, includeDev) {
    return await new Promise((resolve, reject) => {
        checker.init(
            {
                start: workdir,
                production: includeDev ? undefined : true
            },
            function (err, packages) {
                if (err) {
                    reject(err);
                } else {
                    resolve(packages);
                }
            }
        );
    });
};
