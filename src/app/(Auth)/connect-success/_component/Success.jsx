'use client';

import { useEffect, useState } from 'react';
import { Result, Button } from 'antd';

export default function OneDriveSuccess() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      {/* Success Header */}
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 transform ${isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          <Result
            status="success"
            title={
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                OneDrive Connected Successfully!
              </h1>
            }
            subTitle={
              <p className="text-lg text-gray-600 mt-4">
                Your account is now connected and ready to sync your uploads automatically
              </p>
            }
            extra={[
              <Button
                key="dashboard"
                type="primary"
                size="large"
                className="px-8 py-6 text-base font-semibold rounded-lg h-auto"
                onClick={() => {
                  window.location.href = '/admin/dashboard';
                }}
              >
                Go to Dashboard
              </Button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
