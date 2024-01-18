const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5231',  // Replace with your ASP.NET Core API URL
      changeOrigin: true,
    })
  );
};
