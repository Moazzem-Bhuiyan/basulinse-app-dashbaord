'use client';

import React from 'react';
import NextCloudConnectionForm from './NextCloudConnectionForm';

export default function ConnectNextCloudContainer() {
  const handleOpenNextcloud = () => {
    window.open('https://cloud.baulinse.ch');
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10">
      <div className="max-w-6xl mx-auto x grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE → INSTRUCTION PANEL */}

        <div className="bg-gradient-to-br from-[#0f0f13] via-[#16161d] to-[#0d1117] border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Setup Instructions</h2>

            <p className="text-sm text-slate-400 mb-6">
              Follow these steps to connect your Nextcloud account.
            </p>

            {/* Steps */}
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <span className="font-semibold text-indigo-400">Step 1:</span> Click the button
                below to open Nextcloud in a new tab.
              </div>

              <div>
                <span className="font-semibold text-indigo-400">Step 2:</span> Login using the
                credentials we already sent to your email.
              </div>

              <div>
                <span className="font-semibold text-indigo-400">Step 3:</span> Go to{' '}
                <span className="text-white font-medium">Settings → Security</span>.
              </div>

              <div>
                <span className="font-semibold text-indigo-400">Step 4:</span> Create a new{' '}
                <span className="text-white font-medium">App Password</span>.
              </div>

              <div>
                <span className="font-semibold text-indigo-400">Step 5:</span> Copy the App Password
                and come back to this page.
              </div>

              <div>
                <span className="font-semibold text-indigo-400">Step 6:</span> Fill up the form
                with:
                <ul className="list-disc ml-5 mt-2 text-slate-400">
                  <li>Next Claude Username</li>
                  <li>App Password</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleOpenNextcloud}
            className="mt-8 w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-semibold"
          >
            Open Nextcloud →
          </button>
        </div>

        {/* RIGHT SIDE →  */}
        <div className="bg-gradient-to-br from-[#0f0f13] via-[#16161d] to-[#0d1117] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Connect Nextcloud</h2>

          <p className="text-sm text-slate-400 mb-6">
            Enter your Nextcloud details to complete the connection.
          </p>

          {/* Dummy Form Box */}
          <div className=" rounded-xl h-[300px] flex items-center justify-center px-2">
            <NextCloudConnectionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
