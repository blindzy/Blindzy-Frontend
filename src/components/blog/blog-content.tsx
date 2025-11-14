import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function cleanGutenbergComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, '').trim();
}

export default function BlogContent({ content }) {
  const cleanContent = cleanGutenbergComments(content);

  return (
    <div className="blog-content flex flex-col gap-4 prose max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
