import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";

export async function markdownToHtml(markdown) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return html.toString();
}
