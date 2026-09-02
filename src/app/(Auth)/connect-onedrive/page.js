import React from 'react';
import OneDriveSetup from './_Component/ConnectOneDrive';
export const metadata = {
  title: 'Connect OneDrive',
  description: 'Connect OneDrive',
};

export default function page() {
  return (
    <div>
      <OneDriveSetup />
    </div>
  );
}
