module.exports = {
  async rewrites() {
    return [
      {
        source: "/:url_id",
        destination: "/api/:url_id",
      },
    ]
  },
}
