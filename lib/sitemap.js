const util = require("util")
const fs = require("fs")
const path = require("path")
const baseSitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n%s\n</urlset>`;
const domain = "https://thewantara.com"

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) yield* walk(entry);
      else if (d.isFile()) yield entry;
  }
}

async function exportPostsSitemapIndex() {
  let items = [];
  let item = `<url><loc>${domain}/posts/%s</loc><lastmod>%s</lastmod></url>`;

  let dir = 'posts';
  let date = new Date();
  for await (const dirPath of walk(dir)) {
    if (dirPath.endsWith(".md")) {
      let filePath = dirPath.split("/")[1].replace(".md", "")
      items.push(util.format(item, filePath, date))
    }
  }

  const sitemap = util.format(baseSitemap, items.join("\n"))
  const filePath = "public/posts-sitemap-index.xml";
  fs.writeFileSync(filePath, sitemap)
}

module.exports = {
  exportPostsSitemapIndex,
};
