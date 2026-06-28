export interface Photo {
  id: number;
  url: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    title: '海边的黄昏',
    location: '大理',
    date: '2026-06-15',
    description: '傍晚时分的大理洱海边，天空被染成了金橙色。海风轻拂，远处苍山的轮廓逐渐模糊。这一刻，时间仿佛静止了。',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    title: '山间的雾',
    location: '黄山',
    date: '2026-05-20',
    description: '清晨五点半起床，爬到光明顶时雾气刚好散开。云海翻涌，远处的山峰像漂浮在白色海洋中的岛屿。',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
    title: '海浪',
    location: '万宁',
    date: '2026-04-12',
    description: '万宁的海浪很适合冲浪初学者。那天阳光很好，海水是宝石蓝色，浪花打在礁石上溅起的水珠在阳光下闪闪发光。',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    title: '森林光线',
    location: '杭州',
    date: '2026-03-08',
    description: '杭州城郊的一片小森林，午后的阳光从树叶缝隙间洒下来，在地上画出了一片片光斑。空气里有泥土和青草的味道。',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    title: '山间小路',
    location: '张家界',
    date: '2026-02-14',
    description: '张家界国家森林公园里一条不起眼的小路。两旁的树木高大茂密，偶尔有松鼠从路中间跑过。',
  },
  {
    id: 6,
    url: '/images/abujicuo.JPG',
    title: '山间小路',
    location: '张家界',
    date: '2026-06-01',
    description: '张家界国家森林公园里一条不起眼的小路。两旁的树木高大茂密，偶尔有松鼠从路中间跑过。',
  },
];

export function getLatestPhotos(count: number): Photo[] {
  return photos
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function getPhotoById(id: number): Photo | undefined {
  return photos.find((p) => p.id === id);
}
