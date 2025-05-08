
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
      '<h1 class="text-2xl font-bold mt-6 mb-4 text-launchlayer-text-primary">$1</h1>',
    );
    html = html.replace(
      /^## (.*$)/gm,
      '<h2 class="text-xl font-bold mt-5 mb-3 text-launchlayer-text-primary">$1</h2>',
    );
    html = html.replace(
      /^### (.*$)/gm,
      '<h3 class="text-lg font-bold mt-4 mb-2 text-launchlayer-text-primary section-header-blue">$1</h3>',
    );

    // Handle bold and italic
    html = html.replace(/\*\*(.*)\*\*/gm, '<strong class="text-white">$1</strong>');
    html = html.replace(/\*(.*)\*/gm, "<em>$1</em>");

    // Handle code blocks with backticks
    html = html.replace(
      /```([^`]*?)```/gms,
      '<pre class="bg-launchlayer-surface text-launchlayer-text-primary p-4 rounded-md my-4 overflow-x-auto border-l-2 border-[#3787FB] hover:border-[#3787FB] hover:shadow-[0_0_10px_rgba(50,119,245,0.15)] transition-all">$1<div class="text-xs text-launchlayer-text-secondary mt-2">Solidity contract code</div></pre>',
    );

    // Handle inline code
    html = html.replace(
      /`([^`]+)`/gm,
      '<code class="bg-launchlayer-surface-light text-launchlayer-text-primary px-1 py-0.5 rounded text-sm">$1</code>',
    );

    // Handle lists
    html = html.replace(
      /^\- (.*$)/gm,
      '<li class="ml-6 list-disc mb-1 text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-colors">$1</li>',
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
          return `<p class="mb-4 text-launchlayer-text-secondary leading-[1.6]">${para}</p>`;
        }
        return para;
      })
      .join("");

    // Wrap lists
    html = html.replace(/(<li[^>]*>.*<\/li>\n+)+/g, (match) => {
      return `<ul class="mb-4">${match}</ul>`;
    });

    // Add blue underline to key phrases (adding a class that can be targeted with CSS)
    html = html.replace(
      /(important|note|warning|caution|tip|token|launch|sonic|contract|factory):/gi,
      '<span class="text-[#3787FB] underline font-medium">$1:</span>'
    );

    // Highlight key terms
    const keyTerms = [
      "token", "launch", "raise", "sale", "vesting", "contract", "factory", "deployment", 
      "presale", "public sale", "contribution", "allocation"
    ];

    keyTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      html = html.replace(regex, (match) => {
        return `<span class="text-[#3787FB] border-b border-[#3787FB]/30">${match}</span>`;
      });
    });

    return html;
  };

  return (
    <div
      className="markdown-content md:grid md:grid-cols-2 md:gap-8"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
};

export default MarkdownRenderer;
