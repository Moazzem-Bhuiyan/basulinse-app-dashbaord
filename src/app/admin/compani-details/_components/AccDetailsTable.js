'use client';

import { Button, Image, Table, Tag } from 'antd';
import { Plus, UserX } from 'lucide-react';
import AddCompanyModal from './AddCompanyModal';
import { useState } from 'react';
import CompanyDetailsModal from './CompanyDetailsModal';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { useBlockUnblockUserMutation, useGetAllusersQuery } from '@/redux/api/userApi';
import moment from 'moment';
import toast from 'react-hot-toast';

export default function AccDetailsTable() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // User data with query parameterss
  const { data, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // status change api handaler----------------

  const [updateStatus, { isLoading: updating }] = useBlockUnblockUserMutation();

  const handleBlockUser = async (values) => {
    console.log(values);
    const payload = {
      userId: values.id,
      status: values?.status == 'active' ? 'blocked' : 'active',
    };
    try {
      const res = await updateStatus(payload).unwrap();
      if (res.success) {
        toast.success(
          `${values.name} ${values?.status == 'blocked' ? 'unblocked' : 'Blcoked'} successfully!`
        );
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

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
        <div className="flex items-center justify-center">
          <CustomConfirm
            title={`${record?.status == 'blocked' ? 'Unblock User' : 'Blocked User'}`}
            description={`Are you sure to ${record?.status == 'blocked' ? 'Unblock' : 'blocked'} this user?`}
            loading={updating}
            onConfirm={() => handleBlockUser(record)}
          >
            <button>
              <UserX color="#F16365" size={22} />
            </button>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="my-4 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Companies Details</h2>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          type="primary"
          className="flex items-center gap-2 !p-4 text-lg"
          style={{
            width: '200px',
            backgroundColor: '#1C3B47',
            padding: '25x 25px',
            borderRadius: '8px',
          }}
        >
          <Plus size={18} color="#fff" /> Add Company
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
          total: data?.meta?.total || 0,
          showTotal: (total) => `Total ${total} items`,
        }}
        className="min-w-full"
        loading={isLoading}
      />
      <AddCompanyModal open={open} setOpen={setOpen} />
      <CompanyDetailsModal open={detailsOpen} setOpen={setDetailsOpen} />
    </div>
  );
}
