const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        proxy.createProxyMiddleware({
            target: 'http://localhost:9001',
            pathRewrite: {
                '^/api': '',
            },
            changeOrigin: true,
        }),
    )
}