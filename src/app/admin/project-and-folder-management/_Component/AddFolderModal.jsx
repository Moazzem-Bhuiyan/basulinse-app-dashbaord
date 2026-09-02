'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useCreateFolderMutation } from '@/redux/api/folderApi';
import { Button, Modal } from 'antd';
import toast from 'react-hot-toast';

export default function AddFolderModal({ open, setOpen }) {
  // add folder submit api endpoint
  const [addFolder, { isLoading }] = useCreateFolderMutation();
  const handlesubmit = async (values) => {
    try {
      const res = await addFolder(values).unwrap();
      if (res?.success) {
        toast.success('Folder added successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error('Failed to add folder');
    }
  };
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
      <FormWrapper title="Add New Folder" onSubmit={handlesubmit}>
        <UInput label="Folder Name" name="name" placeholder="Enter folder name" />
        <Button loading={isLoading} type="primary" htmlType="submit" className="w-full" block>
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
