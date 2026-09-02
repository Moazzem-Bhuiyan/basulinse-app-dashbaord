'use client';

import { useGetNextcloudStatusQuery } from '@/redux/api/authApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckNextCloudStatusContainer() {
  const { data, isLoading, isError } = useGetNextcloudStatusQuery();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    if (data?.data?.connected) {
      router.push('/admin/dashboard');
    } else {
      router.push('/connect-nextcloud');
    }
  }, [data, router]);

  return (
    <div className="min-h-screen !w-full flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-[440px] rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-[#0f0f13] via-[#16161d] to-[#0d1117] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
        {/* Top bar */}
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-300" />

        {/* Icon */}
        <div className="flex justify-center pt-10 pb-2">
          <svg
            className={`w-14 h-14 transition-all duration-300
              ${isLoading ? 'animate-pulse text-indigo-400' : ''}
              ${isError ? 'text-red-500' : ''}
              ${data?.data?.connected ? 'text-green-500' : 'text-indigo-400'}
            `}
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M48 26.5C47.4 19.1 41.3 13.5 34 13.5C28.5 13.5 23.7 16.6 21.3 21.2C16 21.9 12 26.4 12 31.8C12 37.7 16.8 42.5 22.7 42.5H47.3C52.1 42.5 56 38.6 56 33.8C56 29.3 52.5 25.6 48 26.5Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="px-9 pb-8">
          {isLoading && (
            <div className="animate-fade-in-up">
              <p className="text-[10px] font-bold tracking-[0.15em] text-indigo-400 mb-1">
                CHECKING CONNECTION
              </p>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Nextcloud</h2>
              <p className="text-sm text-slate-500 mb-6">Verifying your cloud connection status…</p>

              <div className="flex gap-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          )}

          {isError && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-red-500 mb-1">
                CONNECTION ERROR
              </p>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Nextcloud</h2>
              <p className="text-sm text-slate-500 mb-6">
                Unable to reach the server. Please check your network and try again.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-400/40 bg-red-400/10 text-red-500 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow" />
                Unreachable
              </div>
            </div>
          )}

          {data && !isLoading && (
            <div>
              <p
                className={`text-[10px] font-bold tracking-[0.15em] mb-1 ${
                  data.data.connected ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                {data.data.connected ? 'CONNECTED' : 'NOT CONNECTED'}
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-2">Nextcloud</h2>

              <p className="text-sm text-slate-500 mb-6">
                {data.data.connected
                  ? `Signed in as ${data.data.username}. Redirecting to dashboard…`
                  : 'No active Nextcloud session found. Redirecting to connect…'}
              </p>

              {data.data.connected ? (
                <>
                  <div className="flex flex-col gap-3 mb-5 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-bold">URL</span>
                      <span className="text-slate-400 truncate max-w-[200px] text-right">
                        {data.data.url || '—'}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-bold">USER</span>
                      <span className="text-slate-400">{data.data.username || '—'}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-bold">SINCE</span>
                      <span className="text-slate-400">
                        {data.data.connectedAt
                          ? new Date(data.data.connectedAt).toLocaleDateString()
                          : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-green-400/40 bg-green-400/10 text-green-500 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow" />
                    Active Session
                  </div>
                </>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-500 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 shadow" />
                  Setup Required
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-2 py-3 border-t border-white/10 bg-black/20 text-[11px] text-slate-700">
          <span>Powered by Nextcloud</span>
          <span>·</span>
          <span>Secure Storage</span>
        </div>
      </div>
    </div>
  );
}
