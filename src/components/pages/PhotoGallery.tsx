import { Link } from 'react-router-dom';
import { photos } from '../../data/photos';

export default function PhotoGallery() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-light text-gray-900 mb-4">摄影</h1>
      <p className="text-gray-500 mb-12">用相机记录那些稍纵即逝的瞬间</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((photo) => (
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

      {photos.length === 0 && (
        <p className="text-gray-400 text-center py-12">暂无照片，等待快门...</p>
      )}
    </div>
  );
}
