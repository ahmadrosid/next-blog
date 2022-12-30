const readLine = require("readline")
const util = require("util")
const fs = require("fs")
const path = require("path")
const matter = require('gray-matter')
const { exportPostsSitemapIndex } = require("./sitemap")

const blog_post_template = `---
title: "%s"
date: "%s"
image: "/images/"
tags: "%s"
published: true
---
`

function ask(query) {
  const input = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => input.question(query, asnwer => {
    input.close()
    resolve(asnwer)
  }))
}

async function createPost() {
  console.log("Create new blog post.")
  const slug = await ask("Slug: ")
  const title = await ask("Title: ")
  const tags = await ask("Tags: ")
  const date = new Date()
  const out = util.format(blog_post_template, title, date, tags)
  const filePath = util.format("./posts/%s.md", slug.replace(" ", "-"))
  fs.writeFileSync(filePath, out)
  console.log(filePath)
  process.exit(0)
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

function getPosts() {
  const blogDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(blogDirectory)

  const posts = fileNames
    .filter(item => item.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(blogDirectory, fileName)
      const id = fileName.replace(/\.md$/, '')
      const fileContents = fs.readFileSync(fullPath, 'utf-8')
      const { data, content } = matter(fileContents)
      return { id, content, ...data }
    })

  return posts
}

function updateLatestPosts() {
  const posts = getPosts()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(item => item.published || item.published == undefined)
    .map(item => {
      return {
        id: item.id,
        title: item.title,
        link: `/posts/${item.id}`,
        image: item.image,
        date: item.date,
        description: item.content.trim().substr(0, 120) + '...'
      }
    })
    .slice(0, 9)

  console.log('Latest posts: ');
  posts.forEach((item, i) => console.log(`${i + 1}. ${item.title}`));

  fs.writeFileSync('./posts/posts.json', JSON.stringify(posts));
}

(async function () {
  const flag = process.argv[2]
  switch (flag) {
    case "--update-index":
      updateLatestPosts();
      await exportPostsSitemapIndex();
      return;
    default:
      await createPost()
  }
})()

