const About = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-light text-gray-900 mb-8">关于</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          你好，我是这个博客的作者。
        </p>

        <p>
          这个博客叫做「人生浪费指南」，不是什么励志鸡汤，也不教你怎么成功。
          恰恰相反，这里记录的是那些"没用"的东西——随手写的随笔、漫无目的的旅行、拍得不好的照片。
        </p>

        <p>
          创建这个博客的初衷，是因为我越来越觉得，现代人的生活被"效率"绑架了。
          我们被教导要每时每刻都"有用"，要不断产出，要不断进步。
          但那些发呆的午后、漫无目的的散步、反复听一首歌的夜晚，难道就没有价值吗？
        </p>

        <p>
          所以，这是一个允许浪费的地方。
        </p>

        <p>
          如果你也想偶尔逃开效率的绑架，欢迎在这里停留一会儿。
        </p>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-xl font-light text-gray-900 mb-4">栏目说明</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-gray-900">随笔</dt>
              <dd className="text-gray-500">一些个人思考与感悟，关于生活，关于时间，关于如何做一个快乐的无用之人。</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">游记</dt>
              <dd className="text-gray-500">旅行并不是为了打卡，而是为了迷失。这里记录那些迷路时的美好发现。</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">摄影</dt>
              <dd className="text-gray-500">用相机记录那些稍纵即逝的瞬间。不一定专业，但一定真诚。</dd>
            </div>
          </dl>
        </div>

        <div className="pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>联系方式：your@email.com</p>
          <p className="mt-2">© 2026 人生浪费指南 · 慢慢来，比较快</p>
        </div>
      </div>
    </div>
  );
};

export default About;
