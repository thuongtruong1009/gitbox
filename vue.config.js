const path = require('path');
module.exports = {
    publicPath: '/searching-github-username/',
    configureWebpack: {
        resolve: {
            modules: [
                path.resolve("./src"),
                path.resolve("./node_modules")
            ]
        },
    }
}