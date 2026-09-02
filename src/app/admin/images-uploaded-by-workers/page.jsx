import React from 'react';
import WorkersImageTable from './_Component/WorkersUploadedImages';

export const metadata = {
  title: 'Images Uploaded by Workers - Admin Dashboard',
  description: 'Manage and view images uploaded by workers in the admin dashboard.',
};

function page() {
  return (
    <div>
      <WorkersImageTable />
    </div>
  );
}

export default page;
