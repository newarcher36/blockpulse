const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: false,                // SSE != WebSocket
            // Optional: these can help streaming in some setups
            onProxyReq: (proxyReq) => {
                proxyReq.setHeader('Cache-Control', 'no-cache');
            },
            onProxyRes: (proxyRes) => {
                proxyRes.headers['Cache-Control'] = 'no-cache';
                proxyRes.headers['X-Accel-Buffering'] = 'no';
            },
        })
    );
};
