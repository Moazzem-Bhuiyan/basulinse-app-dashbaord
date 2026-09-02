'use client';

import { Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Search } from 'lucide-react';
import userImage from '@/assets/images/user-avatar-lg.png';
import { Eye } from 'lucide-react';
import { UserX } from 'lucide-react';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import Image from 'next/image';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { message } from 'antd';
import ProfileModal from '@/components/SharedModals/ProfileModal';
import { Tag } from 'antd';

// Dummy table Data
const data = Array.from({ length: 50 }).map((_, inx) => ({
  key: inx + 1,
  name: 'Booxos',
  userImg: userImage,
  email: 'justina@gmail.com',
  contact: '+1234567890',
  date: '11 oct 24, 11.10PM',
  accountType: 'Customer',
}));

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Block user handler
  const handleBlockUser = () => {
    message.success('User blocked successfully');
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'key',
      render: (value) => `#${value}`,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',

      filters: [
        {
          text: 'Customer',
          value: 'Customer',
        },
        {
          text: 'Service Provider',
          value: 'serviceProvider',
        },
      ],
      filterIcon: () => (
        <Filter size={18} color="#fff" className="flex justify-start items-start" />
      ),
      onFilter: (value, record) => record.accountType.indexOf(value) === 0,
      render: (value) => (
        <Tag color="cyan" className="!text-sm">
          {value}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setProfileModalOpen(true)}>
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title="Block User"
              description="Are you sure to block this user?"
              onConfirm={handleBlockUser}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
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
      <div className="w-1/3 ml-auto gap-x-5 mb-3">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={data}
        scroll={{ x: '100%' }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          total: data.length,
          onChange: (page, pageSize) => {
            console.log('Page:', page, 'Page Size:', pageSize);
          },
          current: 1,
        }}
      ></Table>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
    </ConfigProvider>
  );
}
