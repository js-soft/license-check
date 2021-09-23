#!/usr/bin/env node

const yargs = require("yargs/yargs");

const argv = yargs(yargs.hideBin(process.argv))
    .option("outFile", {
        alias: "o",
        type: "string",
        description: "Where to write the file.",
        default: "./license-out.json"
    })
    .option("file", {
        alias: "f",
        type: "boolean",
        default: false,
        description: "write a file"
    })
    .option("include-dev", {
        type: "boolean",
        default: false,
        description: "Check"
    })
    .option("ignorePackages", {
        type: "array",
        default: [],
        description: "Ignores the license information of given packages"
    })
    .option("ignoreLicenses", {
        type: "array",
        default: [],
        description: "Ignores the given licenses"
    })
    .option("ignoreRegex", {
        type: "string",
        description: "Ignore packages that match the given regex."
    }).argv;

require("../src/execute")({
    writeFile: argv.file,
    path: argv.outFile,
    includeDev: argv.includeDev,
    ignorePackages: argv.ignorePackages,
    ignoreLicenses: argv.ignoreLicenses,
    ignoreRegex: argv.ignoreRegex
}).catch((err) => console.error(err));
