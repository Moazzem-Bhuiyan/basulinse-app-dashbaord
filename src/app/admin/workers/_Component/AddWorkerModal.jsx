'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useAddWorkerMutation } from '@/redux/api/workerApi';
import { Button, Modal } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';

function AddWorkerModal({ open, setOpen }) {
  //  add worker mutation hook
  const [addWorker, { isLoading }] = useAddWorkerMutation();
  const handleSubmit = async (values) => {
    try {
      const res = await addWorker(values).unwrap();
      if (res.success) {
        toast.success('Worker added successfully');
        setOpen(false);
      }
    } catch (error) {
      console.error('Add worker error:', error);
      toast.error(error?.data?.message || 'Failed to add worker');
    }
  };
  return (
    <div>
      <Modal open={open} onCancel={() => setOpen(false)} centered footer={null} width={600}>
        <h2 className="mb-5 text-center text-2xl font-semibold">Add New Worker</h2>
        {/* Form for adding a new company would go here */}
        <FormWrapper onSubmit={handleSubmit}>
          <UInput
            name="name"
            placeholder={'Enter worker name'}
            label="Worker Name"
            type="text"
            className={'h-10 w-full'}
          />
          <UInput
            name="username"
            placeholder={'Enter user name'}
            label="User Name "
            type="text"
            className={'h-10 w-full'}
          />
          {/* <UInput name="password" label="Password" type="password" placeholder={'Enter password'} /> */}
          <UInput
            name="contactNumber"
            label="Phone Number"
            type="tel"
            placeholder={'Enter phone number'}
          />
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="mt-5 h-10 w-full rounded-md"
          >
            Submit
          </Button>
        </FormWrapper>
      </Modal>
    </div>
  );
}

export default AddWorkerModal;
