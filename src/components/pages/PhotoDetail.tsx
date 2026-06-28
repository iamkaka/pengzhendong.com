import { useParams, Link } from 'react-router-dom';
import { getPhotoById, photos } from '../../data/photos';

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const photo = getPhotoById(Number(id));

  if (!photo) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24">
        <h1 className="text-2xl font-light text-gray-900 mb-4">照片未找到</h1>
        <Link to="/photography" className="text-gray-400 hover:text-gray-900 transition-colors">
          ← 返回摄影
        </Link>
      </div>
    );
  }

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/photography" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← 返回摄影
        </Link>
      </div>

      {/* Photo */}
      <div className="bg-gray-50 rounded-xl overflow-hidden mb-8">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full object-contain max-h-[70vh]"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-10">
        {prevPhoto ? (
          <Link
            to={`/photo/${prevPhoto.id}`}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            ← {prevPhoto.title}
          </Link>
        ) : (
          <span />
        )}
        {nextPhoto ? (
          <Link
            to={`/photo/${nextPhoto.id}`}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            {nextPhoto.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Info */}
      <div className="max-w-2xl space-y-6">
        <h1 className="text-2xl font-light text-gray-900">{photo.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <span>{photo.date}</span>
          <span>·</span>
          <span>{photo.location}</span>
        </div>

        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {photo.description}
        </p>
      </div>
    </div>
  );
}
