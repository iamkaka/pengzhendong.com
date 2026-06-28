import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseFrontmatter } from '../../utils/markdown';
import { getLatestPhotos } from '../../data/photos';
import type { Photo } from '../../data/photos';

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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const latestPhotos = getLatestPhotos(3);

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

      setPosts(allPosts.slice(0, 3));
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">人生浪费指南</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          在这个效率至上的时代，也许我们都需要学会如何优雅地浪费时间。
          <br />
          这里记录一些无用的随笔、无目的的旅行、不赚钱的照片。
        </p>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-light text-gray-900">最新文章</h2>
          <Link
            to="/posts"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            全部文章 →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">加载中...</div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/post/${post.slug}`}
                className="block group"
              >
                <article className="border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.frontmatter.date}</span>
                    <span>·</span>
                    <span>{post.frontmatter.tags[0] || ''}</span>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-600 transition-colors mb-3">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed line-clamp-2">
                    {post.frontmatter.excerpt}
                  </p>
                </article>
              </Link>
            ))}

            {posts.length === 0 && (
              <p className="text-gray-400 text-center py-8">
                暂无文章。在 public/content/posts/ 添加 .md 文件即可。
              </p>
            )}
          </div>
        )}
      </section>

      {/* Latest Photos */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-light text-gray-900">最新照片</h2>
          <Link
            to="/photography"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            全部照片 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPhotos.map((photo: Photo) => (
            <Link
              key={photo.id}
              to={`/photo/${photo.id}`}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-light text-gray-900">{photo.title}</h3>
                <p className="text-xs text-gray-400">
                  {photo.location} · {photo.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
