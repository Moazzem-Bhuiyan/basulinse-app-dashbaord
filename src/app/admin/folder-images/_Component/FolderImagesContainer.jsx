'use client';
import { useGetFolderImagesQuery } from '@/redux/api/folderApi';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar } from 'lucide-react';
import { Image } from 'antd';
import { useState } from 'react';

export default function FolderImagesContainer() {
  const params = useSearchParams();
  const folderId = params.get('folderId');
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: res, isLoading } = useGetFolderImagesQuery(
    { folderId },
    { skip: !folderId }
  );

  // Loading Skeleton Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-9 w-48 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="h-5 w-64 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            <div className="h-5 w-32 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-16">
        {/* Generate 3 skeleton date sections */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-16">
            {/* Date Header Skeleton */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
            </div>

            {/* Images Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((card) => (
                <div
                  key={card}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-[4/3] bg-gray-200 animate-pulse relative" />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-xl animate-pulse" />
                      <div className="flex-1 h-4 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!res?.success || !res?.data?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-3xl flex items-center justify-center mb-6">
            <MapPin size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Images Yet</h3>
          <p className="text-gray-500 max-w-sm">This folder doesn&apos;t contain any photos yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pb-20  !p-0">
      {/* Elegant Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Gallery
              </h1>
              <p className="text-gray-500 mt-1">Curated moments • {res.data.length} days</p>
            </div>
            <div className="text-sm text-gray-400 font-mono">
              {res.data.reduce((acc, group) => acc + group.workUpload.length, 0)} photos
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {res.data.map((group, idx) => (
          <div key={idx} className="mb-16">
            {/* Fancy Date Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {group.date}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {group.workUpload.length} photos
                  </p>
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {group.workUpload.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  {/* Image Container */}
                  <div className="aspect-[6/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt="Work Photo"
                      width={600}
                      height={450}
                      className="!object-fill transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Subtle Gradient Overlay */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" /> */}
                  </div>

                  {/* Location Bar */}
                  <a
                    href={item.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md text-gray-800 text-sm font-medium px-4 py-1 rounded-2xl flex items-center gap-3 shadow-lg hover:bg-white transition-colors group-hover:scale-[1.02]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-7 h-7 bg-red-100 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <span className="truncate text-[10px]">{item.location}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}