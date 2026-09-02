'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useAddcompanyMutation } from '@/redux/api/userApi';
import { Button, Modal } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';

function AddCompanyModal({ open, setOpen }) {
  // add companny api
  const [addCompany, { isLoading }] = useAddcompanyMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await addCompany(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Company added successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };
  return (
    <div>
      <Modal open={open} onCancel={() => setOpen(false)} centered footer={null} width={600}>
        <h2 className="mb-5 text-center text-2xl font-semibold">Add New Company</h2>
        {/* Form for adding a new company would go here */}
        <FormWrapper onSubmit={handleSubmit}>
          <UInput
            name="name"
            label="Company Name"
            type="text"
            className={'h-10 w-full'}
            placeholder={'Enter user name'}
          />
          <UInput
            name="email"
            label="Email"
            type="email"
            placeholder={'Enter user email'}
          />
          <UInput
            name="contactNumber"
            label="Phone Number"
            type="tel"
            placeholder={'Enter company phone number'}
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

export default AddCompanyModal;
