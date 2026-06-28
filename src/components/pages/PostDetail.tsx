import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { parseFrontmatter, extractContent, MarkdownRenderer } from '../../utils/markdown';

const postModules = import.meta.glob('/public/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{
    frontmatter: ReturnType<typeof parseFrontmatter>;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        const path = `/public/content/posts/${slug}.md`;
        const loader = postModules[path];

        if (!loader) {
          setError(true);
          setLoading(false);
          return;
        }

        const content = (await loader()) as string;
        const frontmatter = parseFrontmatter(content);
        const extractedContent = extractContent(content);

        setPost({ frontmatter, content: extractedContent });
      } catch (err) {
        console.error('Error loading post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-12 text-gray-400">加载中...</div>;
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-light text-gray-900 mb-4">文章未找到</h1>
        <p className="text-gray-500 mb-8">请确保文章文件存在于 public/content/posts/ 目录下</p>
        <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
          返回首页 →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/posts"
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
      >
        ← 返回文章列表
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{post.frontmatter.date}</span>
        </div>
        <h1 className="text-3xl font-light text-gray-900 mb-6">{post.frontmatter.title}</h1>
        <div className="flex gap-2">
          {post.frontmatter.tags.map((t) => (
            <Link
              key={t}
              to={`/tags/${encodeURIComponent(t)}`}
              className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      </header>

      <article>
        <MarkdownRenderer content={post.content} />
      </article>

      <footer className="mt-16 pt-8 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-400">© 2026 人生浪费指南</div>
        </div>
      </footer>
    </div>
  );
}
