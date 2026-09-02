'use client';

import { useGetImagesByWorkerIdQuery } from '@/redux/api/imageApi';
import { Image, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { MapPin, Clock, User } from 'lucide-react';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Dhaka');
moment.locale('en');

const Dashboard = () => {
  const params = useSearchParams();
  const workerId = params.get('workerId');

  const { data: res, isLoading, isError } = useGetImagesByWorkerIdQuery(workerId);

  const images = res?.data?.[0]?.workUpload || [];

  // Loading Skeleton
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="space-y-3">
            <div className="h-8 w-80 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-5 w-52 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded-lg animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) return <SkeletonLoader />;

  if (isError || !res?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <User size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Failed to Load</h3>
          <p className="text-gray-500">Could not fetch worker images.</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
            <MapPin size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Photos Yet</h3>
          <p className="text-gray-500 max-w-sm">This worker hasn&apos;t uploaded any photos yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      {/* Elegant Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
              <User size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Worker Gallery
              </h1>
              <p className="text-gray-500 mt-1">
                {images.length} photos • Worker ID: {workerId}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {images.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt="Work Photo"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                  preview={{
                    mask: (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-medium">
                          View Full Image
                        </div>
                      </div>
                    ),
                  }}
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
              </div>

              {/* Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-800 text-sm font-medium leading-tight line-clamp-2">
                      {item.location}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{moment(item.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;