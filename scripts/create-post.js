const fs = require('fs');
const path = require('path');

// 读取命令行参数
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('使用方法: node create-post.js <栏目> <标题> <文件名>');
  console.log('栏目: essays(随笔) / travel(游记)');
  console.log('示例: node create-post.js essays "我的第一篇随笔" my-first-essay');
  process.exit(1);
}

const [category, title, filename] = args;

// 验证栏目
if (!['essays', 'travel'].includes(category)) {
  console.error('错误：栏目必须是 essays 或 travel');
  process.exit(1);
}

// 生成日期
const today = new Date();
const date = today.toISOString().split('T')[0];

// 创建 markdown 内容
const content = `---
title: "${title}"
date: "${date}"
tags: ["标签1", "标签2"]
excerpt: "这里写文章摘要，会显示在文章列表中"
---

# ${title}

这里开始写你的文章内容...

## 小节标题

正文内容...

- 列表项 1
- 列表项 2

**粗体文本** 和 *斜体文本*

> 引用文本

\`\`\`
代码示例
\`\`\`
`;

// 写入文件
const filePath = path.join(__dirname, '..', 'public', 'content', category, `${filename}.md`);
const dir = path.dirname(filePath);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ 文章创建成功：${filePath}`);
console.log('');
console.log('下一步：');
console.log('1. 编辑上面的文件，填写完整内容');
console.log('2. 在 src/components/pages/EssayList.tsx 或 TravelList.tsx 中添加文章文件名');
console.log('');
console.log('文件路径：');
console.log(filePath);
