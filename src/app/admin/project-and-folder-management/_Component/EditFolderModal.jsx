'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useCreateFolderMutation, useUpdateFolderMutation } from '@/redux/api/folderApi';
import { Button, Modal } from 'antd';
import toast from 'react-hot-toast';

export default function EditFolderModal({ open, setOpen, name }) {
  console.log('🚀 ~ EditFolderModal ~ name:', name);
  // add folder submit api endpoint
  const [upDate, { isLoading }] = useUpdateFolderMutation();
  const handlesubmit = async (values) => {
    try {
      const res = await upDate({ id: name?.id, data: values?.name }).unwrap();
      if (res?.success) {
        toast.success('Folder edited successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error('Failed to edit folder');
    }
  };
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
      <FormWrapper
        title="Edit Folder"
        onSubmit={handlesubmit}
        defaultValues={{
          name: name?.name,
        }}
      >
        <UInput label="Folder Name" name="name" placeholder="Enter folder name" />
        <Button loading={isLoading} type="primary" htmlType="submit" className="w-full" block>
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
