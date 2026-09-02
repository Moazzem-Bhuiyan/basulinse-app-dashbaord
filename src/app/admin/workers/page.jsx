import React from 'react';
import WorkersTable from './_Component/WorkersTable';

export const Metadata = {
  title: 'Workers',
  description: 'Workers management page',
};

function page() {
  return (
    <div>
      <h1>Workers Management</h1>
      <WorkersTable />
    </div>
  );
}

export default page;
