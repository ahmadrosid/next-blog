---
title: "How to Create a Blog post?"
date: "2022-09-14T10:28:11.163Z"
image: "/images/"
tags: "blog"
published: true
---


You can create the blog post using markdown format. The markdown format is parsed using gray-matter for adding a metadata to the markdown header.

## Code highlight

For JSX
```jsx
<div>
  <h1>This is syntax highlight</h1>
</div>
```

For Javascript
```js
export async function getStaticPaths() {
  const paths = getAllBlogPostIds()
  return {
    paths,
    fallback: false
  }
}
```


## A list

This is how you do a List
1. List one
2. List one
3. List one
4. List one

Bulet list

- List one
- List one
- List one
- List one