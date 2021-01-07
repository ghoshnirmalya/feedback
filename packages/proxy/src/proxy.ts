import httpProxy from "http-proxy";

function proxy(protocol: string, host: string) {
  httpProxy
    .createProxyServer({
      target: {
        protocol,
        host,
        port: 443,
      },
      changeOrigin: true,
    })
    .listen(8000);
}

export default proxy;
