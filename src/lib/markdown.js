import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

function isElement(node, tagName) {
  return node && node.type === "element" && node.tagName === tagName;
}

function getClassNameList(node) {
  const className = node?.properties?.className;
  if (!className) return [];
  return Array.isArray(className) ? className : [String(className)];
}

function toText(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (!Array.isArray(node.children)) return "";
  return node.children.map(toText).join("");
}

/**
 * Turn ```mermaid fenced blocks into <div class="mermaid">...</div>
 * so Mermaid can render them client-side.
 */
function rehypeMermaidBlocks() {
  return (tree) => {
    const visit = (node, parent, index) => {
      if (!node) return;

      if (isElement(node, "pre") && Array.isArray(node.children)) {
        const code = node.children.find((c) => isElement(c, "code"));
        if (code) {
          const classNames = getClassNameList(code);
          const isMermaid = classNames.includes("language-mermaid");
          if (isMermaid && parent && typeof index === "number") {
            const value = toText(code).trimEnd();
            parent.children[index] = {
              type: "element",
              tagName: "div",
              properties: { className: ["mermaid"] },
              children: [{ type: "text", value }],
            };
            return;
          }
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach((child, i) => visit(child, node, i));
      }
    };

    visit(tree, null, null);
  };
}

export async function markdownToHtml(markdown) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeMermaidBlocks)
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
