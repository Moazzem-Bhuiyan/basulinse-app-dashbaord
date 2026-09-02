'use client';

import { Avatar, ConfigProvider } from 'antd';
import { Table } from 'antd';
import { UserX } from 'lucide-react';
import { Eye } from 'lucide-react';

import Image from 'next/image';
import userImage from '@/assets/images/user-avatar.png';
import { Tooltip } from 'antd';
import { Tag } from 'antd';
import { useState } from 'react';
import ProfileModal from '@/components/SharedModals/ProfileModal';

// Dummy Data
const data = Array.from({ length: 4 }).map((_, inx) => ({
  key: inx + 1,
  name: 'BuildTech Ltd.',
  userImg: userImage,
  email: 'booxos@gmail.com',
  contact: '+1234567890',
  date: '11 oct 24, 11:10 PM',
  accountType: 'Active',
}));

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // =============== Table columns ===============
  const columns = [
    {
      title: ' Company Name',
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'accountType',
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          {value}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <button onClick={() => setShowProfileModal(true)}>
            <Eye size={24} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1B70A6',
          colorInfo: '#1B70A6',
        },
      }}
    >
      <div className="">
        <h1 className="text-xl font-semibold"> Companies</h1>
        <p className="text-sm text-gray-500 mb-5">
          Here are the latest Companies who joined the platform.
        </p>
        <Table
          style={{ overflowX: 'auto', width: '100%' }}
          columns={columns}
          dataSource={data}
          scroll={{ x: '100%' }}
          pagination={false}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
