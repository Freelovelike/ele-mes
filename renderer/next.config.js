module.exports = {
  images: {
    domains: ["cdn.pixabay.com", "static.apsu.tech", "images.tuyacn.com"],
    loader: "akamai",
    path: "/",
    dangerouslyAllowSVG: true,
  },
  experimental: {
    outputStandalone: true,
    nextScriptWorkers: true,
  },
  compiler: {
    styledComponents: true,
  },
}
