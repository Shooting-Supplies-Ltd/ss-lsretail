module.exports = {
  siteUrl: 'https://www.shootingsuppliesltd.co.uk',
  generateRobotsTxt: false, // (optional)
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api'],
  transform: async (config, path) => ({
    loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
};
