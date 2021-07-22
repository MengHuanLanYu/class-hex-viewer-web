const config = require('./src/config');

module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    outputDir: config.outputDir,
    devServer: {
        port: config.port,
        // open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: config.apiUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}