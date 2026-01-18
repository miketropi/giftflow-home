import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { markdownToHtml } from "@/lib/markdown";

const postsDirectory = path.join(process.cwd(), 'src/posts')

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  const __content = await markdownToHtml(content)

  return {
    slug,
    ...data,
    content: __content,
  }
}

export function getAllPostSlugs() {
  return fs.readdirSync(postsDirectory).map(file =>
    file.replace(/\.md$/, '')
  )
}
