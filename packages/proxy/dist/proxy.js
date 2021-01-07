"use strict";

var httpProxy = require("http-proxy");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var httpProxy__default = /*#__PURE__*/ _interopDefaultLegacy(httpProxy);

function proxy(protocol, host) {
  httpProxy__default["default"]
    .createProxyServer({
      target: {
        protocol: protocol,
        host: host,
        port: 443,
      },
      changeOrigin: true,
    })
    .listen(8000);
}

module.exports = proxy;
