import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseFrontmatter } from '../../utils/markdown';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
  };
}

const postModules = import.meta.glob('/public/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts: Post[] = [];

      for (const path in postModules) {
        const slug = path.match(/\/([^/]+)\.md$/)?.[1] || '';
        try {
          const content = (await postModules[path]()) as string;
          const frontmatter = parseFrontmatter(content);

          allPosts.push({ slug, frontmatter });
        } catch (error) {
          console.error(`Error loading ${slug}:`, error);
        }
      }

      allPosts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
      setPosts(allPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-400">加载中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-light text-gray-900 mb-12">全部文章</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <Link key={post.slug} to={`/post/${post.slug}`} className="block group">
            <article className="border-b border-gray-100 pb-8">
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <span>{post.frontmatter.date}</span>
                <span>·</span>
                <span>{post.frontmatter.tags[0] || ''}</span>
              </div>
              <h2 className="text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors mb-4">
                {post.frontmatter.title}
              </h2>
              <p className="text-gray-500 leading-relaxed">{post.frontmatter.excerpt}</p>
              <div className="flex gap-2 mt-4">
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          暂无文章。在 public/content/posts/ 添加 .md 文件即可。
        </p>
      )}
    </div>
  );
}
