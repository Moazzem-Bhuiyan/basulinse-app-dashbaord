import React from 'react';
import CheckNextCloudStatusContainer from './_Component/CheckNextCloudStatusContainer';

export const metadata = {
  title: 'Check NextCloud Status',
  description: 'Check the status of your NextCloud connection.',
};

export default function page() {
  return (
    <div>
      <CheckNextCloudStatusContainer />
    </div>
  );
}
