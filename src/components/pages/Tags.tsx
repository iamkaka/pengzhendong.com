import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

export default function Tags() {
  const { tag } = useParams<{ tag: string }>();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const posts: Post[] = [];

      for (const path in postModules) {
        const slug = path.match(/\/([^/]+)\.md$/)?.[1] || '';
        try {
          const content = (await postModules[path]()) as string;
          const frontmatter = parseFrontmatter(content);

          posts.push({ slug, frontmatter });
        } catch (error) {
          console.error(`Error loading ${slug}:`, error);
        }
      }

      posts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
      setAllPosts(posts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  // 收集所有标签及其文章数量
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  // 如果有选中标签，过滤文章
  const filteredPosts = tag
    ? allPosts.filter((post) => post.frontmatter.tags.includes(tag))
    : [];

  if (loading) {
    return <div className="text-center py-12 text-gray-400">加载中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-light text-gray-900 mb-8">标签</h1>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-3 mb-12">
        {sortedTags.map(([t, count]) => (
          <Link
            key={t}
            to={`/tags/${encodeURIComponent(t)}`}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              tag === t
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t} ({count})
          </Link>
        ))}

        {sortedTags.length === 0 && (
          <p className="text-gray-400">暂无标签</p>
        )}
      </div>

      {/* Filtered posts */}
      {tag && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-light text-gray-900">
              标签：{tag}
            </h2>
            <Link to="/tags" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
              查看全部标签 →
            </Link>
          </div>

          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} to={`/post/${post.slug}`} className="block group">
                <article className="border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.frontmatter.date}</span>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-600 transition-colors mb-3">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{post.frontmatter.excerpt}</p>
                </article>
              </Link>
            ))}

            {filteredPosts.length === 0 && (
              <p className="text-gray-400 text-center py-8">
                该标签下暂无文章
              </p>
            )}
          </div>
        </div>
      )}

      {!tag && allPosts.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          暂无文章。在 public/content/posts/ 添加 .md 文件即可。
        </p>
      )}
    </div>
  );
}
