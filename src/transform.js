module.exports = function (packages, ignorePrefixes) {
    const out = {};

    for (const packageName in packages) {
        if (ignorePrefixes && packageName.match(ignorePrefixes)) continue;

        const license = packages[packageName].licenses;

        if (!out[license]) {
            out[license] = [];
        }

        out[license].push(packageName);
    }

    return out;
};
