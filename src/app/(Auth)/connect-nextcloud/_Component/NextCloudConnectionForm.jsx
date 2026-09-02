import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useConnectNextcloudMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function NextCloudConnectionForm() {
  const router = useRouter();
  // connect api end point
  const [connectNextcloud, { isLoading }] = useConnectNextcloudMutation();
  const handlesubmit = async (data) => {
    try {
      const res = await connectNextcloud(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Nextcloud connected successfully');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-12">
      <FormWrapper onSubmit={handlesubmit}>
        <UInput
          name="username"
          label="Next claude Username"
          type="text"
          className={'h-10 w-full'}
          placeholder={'Enter your Nextcloud username'}
        />
        <UInput
          name="password"
          label="App Password"
          type="password"
          className={'h-10 w-full'}
          placeholder={'Enter your app password'}
        />

        <button
          type="submit"
          className=" w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-semibold"
        >
          {isLoading ? 'Connecting...' : 'Connect Nextcloud'}
        </button>
      </FormWrapper>
    </div>
  );
}
