'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../../schema/authSchema';
import FormWrapper from '../../../../components/Form/FormWrapper';
import UInput from '../../../../components/Form/UInput';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import logo from '../../../../assets/logos/logo.png';
import Image from 'next/image';
import { useSignInMutation } from '@/redux/api/authApi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';

export default function LoginForm() {
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  const onLoginSubmit = async (data) => {
    const fcmToken = '123';
    const value = {
      ...data,
      fcmToken,
    };

    try {
      const res = await signIn(value).unwrap();

      if (res?.success) {
        toast.success('Login successful');
        dispatch(
          setUser({
            token: res?.data?.accessToken,
            user: res?.data?.user,
          })
        );
        router.push('/admin/dashboard');
        // 2️ If OneDrive already connected → Dashboard
        // router.push('/checkNextcloudStatus');
        return;
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error?.data?.message);
    }
  };

  return (
    <div className="w-1/3 ">
      <section className="mb-4">
        <Image
          src={logo}
          alt="Company Logo"
          height={1000}
          width={1500}
          className="h-[] !w-[100px]"
        />

        <h4 className="mb-1 mt-4 text-2xl font-bold">Welcome back to Baulinse</h4>
        <p className="text-dark-gray">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isLoading}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  );
}
