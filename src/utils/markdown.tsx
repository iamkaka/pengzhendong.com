import ReactMarkdown from 'react-markdown';

/**
 * Post frontmatter interface
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface Post {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
}

/**
 * Parse frontmatter from markdown content
 * Handles Windows line endings and BOM
 */
export function parseFrontmatter(markdownContent: string): PostFrontmatter {
  // Remove BOM if present
  let content = markdownContent.replace(/^\uFEFF/, '');
  
  // Normalize line endings
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const frontmatter: PostFrontmatter = {
    title: 'Untitled',
    date: '',
    tags: [],
    excerpt: '',
  };

  // Match frontmatter block
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.warn('No frontmatter found in content');
    return frontmatter;
  }

  const frontmatterStr = match[1];

  frontmatterStr.split('\n').forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) return;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    // Remove surrounding quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (key === 'title') {
      frontmatter.title = value;
    } else if (key === 'date') {
      frontmatter.date = value;
    } else if (key === 'tags') {
      try {
        frontmatter.tags = JSON.parse(value);
      } catch {
        frontmatter.tags = [];
      }
    } else if (key === 'excerpt') {
      frontmatter.excerpt = value;
    }
  });

  return frontmatter;
}

/**
 * Extract content from markdown (without frontmatter)
 * Handles Windows line endings
 */
export function extractContent(markdownContent: string): string {
  // Remove BOM if present
  let content = markdownContent.replace(/^\uFEFF/, '');
  
  // Normalize line endings
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const frontmatterRegex = /^---\n[\s\S]*?\n---/;
  return content.replace(frontmatterRegex, '').trim();
}

/**
 * Markdown renderer component with custom styling
 */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-gray max-w-none 
      prose-headings:font-light 
      prose-headings:text-gray-900 
      prose-p:leading-relaxed 
      prose-p:text-gray-600 
      prose-a:text-gray-900 
      prose-a:underline 
      prose-a:hover:text-gray-600 
      prose-strong:text-gray-900 
      prose-code:text-gray-900 
      prose-code:bg-gray-100 
      prose-code:px-1 
      prose-code:py-0.5 
      prose-code:rounded 
      prose-pre:bg-gray-50 
      prose-pre:border 
      prose-pre:border-gray-200 
      prose-img:rounded-lg 
      prose-img:shadow-sm">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
