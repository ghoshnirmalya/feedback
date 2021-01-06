import httpProxy from "http-proxy";

httpProxy
  .createProxyServer({
    target: {
      protocol: "https:",
      host: "hashnode.com",
      port: 443,
    },
    changeOrigin: true,
  })
  .listen(8000);
