import React from "react";

interface MarkdownRendererProps {
  markdown: string;
}

// A simple markdown renderer for the MVP
// In a real implementation, we would use a proper markdown library like react-markdown
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const renderMarkdown = (text: string) => {
    // Handle headers
    let html = text.replace(
      /^# (.*$)/gm,
      '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>',
    );
    html = html.replace(
      /^## (.*$)/gm,
      '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>',
    );
    html = html.replace(
      /^### (.*$)/gm,
      '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>',
    );

    // Handle bold and italic
    html = html.replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>");
    html = html.replace(/\*(.*)\*/gm, "<em>$1</em>");

    // Handle code blocks with backticks
    html = html.replace(
      /```([^`]*?)```/gms,
      '<pre class="bg-gray-800 text-gray-200 p-4 rounded-md my-4 overflow-x-auto"><code>$1</code></pre>',
    );

    // Handle inline code
    html = html.replace(
      /`([^`]+)`/gm,
      '<code class="bg-gray-800 text-gray-200 px-1 py-0.5 rounded text-sm">$1</code>',
    );

    // Handle lists
    html = html.replace(
      /^\- (.*$)/gm,
      '<li class="ml-6 list-disc mb-1">$1</li>',
    );

    // Handle paragraphs
    html = html
      .split(/\n\n+/)
      .map((para) => {
        if (
          !para.startsWith("<h1") &&
          !para.startsWith("<h2") &&
          !para.startsWith("<h3") &&
          !para.includes("<li") &&
          !para.startsWith("<pre")
        ) {
          return `<p class="mb-4 text-cradle-text-secondary">${para}</p>`;
        }
        return para;
      })
      .join("");

    // Wrap lists
    html = html.replace(/(<li[^>]*>.*<\/li>\n+)+/g, (match) => {
      return `<ul class="mb-4">${match}</ul>`;
    });

    return html;
  };

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
};

export default MarkdownRenderer;
