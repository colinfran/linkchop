/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://linkchop.com/",
  exclude: ["/icon.svg", "/apple-icon.png", "/manifest.webmanifest", "/api/test"],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
}
