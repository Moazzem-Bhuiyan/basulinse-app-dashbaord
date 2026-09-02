'use client';

import { Image, Table, Tag } from 'antd';
import { useState } from 'react';
import { useGetWorkersQuery } from '@/redux/api/workerApi';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function WorkersImageTable() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // User data with query parameterss
  const { data, isLoading } = useGetWorkersQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  const dataSource = data?.data?.map((user, index) => ({
    key: user.id,
    id: user._id,
    companyName: user.name,
    email: user.email,
    joinDate: moment(user.createdAt).format('ll'),
    status: user.status,
    photo: user.photoUrl,
  }));

  // Table columns matching the image design
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: 80,
      className: ' font-semibold',
    },
    {
      title: 'COMPANY NAME',
      dataIndex: 'companyName',
      width: 200,
      className: ' font-semibold',
      render: (value, record) => {
        // Helper function to validate URL
        const isValidUrl = (url) => {
          if (!url) return false;
          return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
        };

        // Get the first letter of the name (uppercase)
        const firstLetter = value ? value.charAt(0).toUpperCase() : '';

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.photo);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.photo}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full w-10 h-auto aspect-square"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#67cccc] text-white text-lg font-medium">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      width: 200,
      className: ' font-semibold',
    },
    {
      title: 'JOIN DATE',
      dataIndex: 'joinDate',
      width: 120,
      className: ' font-semibold',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: 120,
      className: ' text-white font-semibold',
      render: (status) => (
        <Tag color={status === 'active' ? '#52C41A' : '#F5222D'} className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      width: 100,
      className: 'text-white font-semibold',
      render: (_, record) => (
        <div>
          <button
            onClick={() => {
              router.push(`/admin/view-Images?workerId=${record.id}`);
            }}
            className=" text-black underline"
          >
            View Images
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={isLoading}
        className="min-w-full"
      />
    </div>
  );
}
