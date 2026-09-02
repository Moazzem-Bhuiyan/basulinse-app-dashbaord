'use client';

import { Button, Table } from 'antd';
import { useState } from 'react';
import AddFolderModal from './AddFolderModal';
import { useDeleteFolderMutation, useGetAllFoldersQuery } from '@/redux/api/folderApi';
import moment from 'moment';
import EditFolderModal from './EditFolderModal';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function ProjectAndFolderManagement() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handleEdit = (record) => {
    setSelectedProject(record);
    setEditModalOpen(true);
  };

  // get projects from api endpoint
  const { data: projects, isLoading } = useGetAllFoldersQuery({
    limit: 10,
    page: currentPage,
    search: SearchText,
  });
  const data = projects?.data?.map((item, index) => ({
    serial: index + 1,
    id: item._id,
    name: item.name,
    photosCount: item.photosCount,
    createdAt: moment(item.createdAt).format('ll'),
  }));

  // delete folder api
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  // delete folder handler
  const handleDelete = async (record) => {
    try {
      const res = await deleteFolder(record.id).unwrap();
      if (res?.success) {
        toast.success('Folder deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete folder');
    }
  };

  const columns = [
    { title: 'Serial', dataIndex: 'serial', key: 'serial', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Photos Count', dataIndex: 'photosCount', key: 'photosCount' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action',
      key: 'action',
      width: 80 * 3,
      render: (_, record) => (
        <div className="flex gap-5">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <CustomConfirm
            title="Delete Project"
            description="Are you sure to delete this project?"
            onConfirm={() => handleDelete(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </CustomConfirm>
          <Button
            onClick={() => {
              router.push(`/admin/folder-images?folderId=${record.id}`);
            }}
            type="primary"
          >
            View Images
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setOpen(true)} type="primary" className="w-full">
        Add Project
      </Button>

      <div className="mt-6">
        <div className="overflow-x-auto overflow-auto">
          <Table
            className="min-w-full"
            dataSource={data}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: 10,
              onChange: (page) => setCurrentPage(page),
              total: projects?.meta?.total || 0,
              showTotal: (total) => `Total ${total} items`,
            }}
            loading={isLoading}
          />
        </div>
      </div>

      <AddFolderModal open={open} setOpen={setOpen} />

      <EditFolderModal open={EditModalOpen} setOpen={setEditModalOpen} name={selectedProject} />
    </div>
  );
}
