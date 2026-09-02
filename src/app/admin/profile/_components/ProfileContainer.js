'use client';

import Image from 'next/image';
import {
  ImagePlus,
  Copy,
  Check,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  UserRound,
  Download,
  Monitor,
  Apple,
} from 'lucide-react';
import {
  ConfigProvider,
  Tabs,
  message,
  Skeleton,
  Button,
} from 'antd';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ChangePassForm from './ChangePassForm';
import EditProfileForm from './EditProfileForm';
import { useGetMyProfileQuery } from '@/redux/api/authApi';
import { useLazyGetWebDAVQuery } from '@/redux/api/webDAVapi';
import noUser from '@/assets/images/nouser.png';
import toast from 'react-hot-toast';

export default function ProfileContainer() {
  const {
    data,
    isLoading,
  } = useGetMyProfileQuery();

  const [
    downloadWebDAVScript,
    {
      isFetching: webDavLoading,
    },
  ] = useLazyGetWebDAVQuery();

  const user = data?.data;

  const [selectedImage, setSelectedImage] = useState(null);
  const [copied, setCopied] = useState(null);
  const [detectedOS, setDetectedOS] = useState(null);

  const fileInputRef = useRef(null);

  /*
   * Windows অথবা macOS detect করবে।
   *
   * Backend os query:
   * Windows => windows
   * macOS   => mac
   */
  const detectOperatingSystem = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = (
      window.navigator.userAgentData?.platform ||
      window.navigator.platform ||
      ''
    ).toLowerCase();

    const isWindows =
      platform.includes('win') ||
      userAgent.includes('windows');

    const isMac =
      platform.includes('mac') ||
      userAgent.includes('macintosh');

    /*
     * iPadOS অনেক ক্ষেত্রে Macintosh হিসেবে report করে।
     * কিন্তু backend-এর mac script AppleScript,
     * যা desktop macOS-এর জন্য।
     */
    const isTouchDevice =
      navigator.maxTouchPoints > 1;

    const isIPad =
      platform.includes('mac') &&
      isTouchDevice;

    const isIOS =
      /iphone|ipad|ipod/.test(userAgent) ||
      isIPad;

    if (isWindows) {
      return 'windows';
    }

    if (isMac && !isIOS) {
      return 'mac';
    }

    if (isIOS) {
      return 'ios';
    }

    return 'unsupported';
  };

  useEffect(() => {
    setDetectedOS(detectOperatingSystem());
  }, []);

  const previewImage = useMemo(() => {
    if (!selectedImage) {
      return user?.photoUrl || noUser;
    }

    return URL.createObjectURL(selectedImage);
  }, [selectedImage, user?.photoUrl]);

  useEffect(() => {
    return () => {
      if (
        selectedImage &&
        typeof previewImage === 'string' &&
        previewImage.startsWith('blob:')
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [selectedImage, previewImage]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      message.error(
        'Only JPG, PNG and WEBP images are allowed.',
      );

      event.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      message.error(
        'Image size must be less than 5 MB.',
      );

      event.target.value = '';
      return;
    }

    setSelectedImage(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const copyToClipboard = async (text, field) => {
    if (!text) {
      message.warning('No value available to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);

      setCopied(field);
      message.success('Copied to clipboard.');

      window.setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch {
      message.error('Unable to copy the value.');
    }
  };

  const formatRole = (role) => {
    if (!role) return 'User';

    return role
      .split('_')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(' ');
  };

  const formatJoinedDate = (date) => {
    if (!date) return 'Not available';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Not available';
    }

    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const downloadBlobFile = (
    blob,
    fileName,
  ) => {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = objectUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 1000);
  };

  const handleConnectWebDAV = async () => {
    const currentOS =
      detectedOS || detectOperatingSystem();

    if (!currentOS) {
      toast.error(
        'Unable to detect your operating system.',
      );
      return;
    }
    if (currentOS === 'ios') {
      toast.warning(
        'Automatic WebDAV setup is only available on Windows and macOS computers. Please open this page from your Mac.',
      );
      return;
    }

    if (currentOS === 'unsupported') {
      toast.warning(
        'Your operating system is not currently supported. Please use Windows or macOS.',
      );
      return;
    }

    try {
      /*
       * unwrap() করলে Blob সরাসরি পাওয়া যাবে।
       * Query param হবে:
       *
       * ?os=windows
       * অথবা
       * ?os=mac
       */
      const blob = await downloadWebDAVScript({
        os: currentOS,
      }).unwrap();

      if (!(blob instanceof Blob)) {
        throw new Error(
          'Invalid download response received.',
        );
      }

      const fileName =
        currentOS === 'windows'
          ? 'connect-drive.bat'
          : 'mount-drive.scpt';

      downloadBlobFile(blob, fileName);

      if (currentOS === 'windows') {
        toast.success(
          'Windows WebDAV setup script downloaded.',
        );
      } else {
        toast.success(
          'macOS WebDAV setup script downloaded.',
        );
      }
    } catch (error) {
      console.error(
        'WebDAV download error:',
        error,
      );

      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        'WebDAV script download failed.';

      toast.error(errorMessage);
    }
  };

  const getOperatingSystemLabel = () => {
    switch (detectedOS) {
      case 'windows':
        return 'Windows detected';

      case 'mac':
        return 'macOS detected';

      case 'ios':
        return 'iOS detected';

      case 'unsupported':
        return 'Unsupported device';

      default:
        return 'Detecting device...';
    }
  };

  const getOperatingSystemIcon = () => {
    if (detectedOS === 'mac') {
      return <Apple size={16} />;
    }

    return <Monitor size={16} />;
  };

  const tabItems = [
    {
      key: 'editProfile',
      label: 'Edit Profile',
      children: (
        <div className="pt-4">
          <EditProfileForm
            user={user}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      ),
    },
    {
      key: 'changePassword',
      label: 'Change Password',
      children: (
        <div className="pt-4">
          <ChangePassForm />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <Skeleton
                active
                avatar
                paragraph={{ rows: 8 }}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <Skeleton
                  active
                  paragraph={{ rows: 4 }}
                />
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <Skeleton
                  active
                  paragraph={{ rows: 8 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1b71a7',
          borderRadius: 12,
          fontFamily: 'inherit',
        },
        components: {
          Tabs: {
            itemSelectedColor: '#1b71a7',
            inkBarColor: '#1b71a7',
          },
        },
      }}
    >
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8">
            {/* Left profile card */}
            <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-36 w-36 overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-xl sm:h-40 sm:w-40">
                    <Image
                      src={previewImage}
                      alt={
                        user?.name
                          ? `${user.name}'s profile`
                          : 'Profile'
                      }
                      width={320}
                      height={320}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>

                  <button
                    type="button"
                    onClick={triggerFileInput}
                    aria-label="Upload profile image"
                    title="Upload profile image"
                    className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b71a7] text-white shadow-lg transition hover:bg-[#155d8b] focus:outline-none focus:ring-4 focus:ring-sky-100"
                  >
                    <ImagePlus size={21} />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="mt-7">
                  <h1 className="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
                    {user?.name || 'User Name'}
                  </h1>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-[#1b71a7]">
                    <ShieldCheck size={16} />
                    {formatRole(user?.role)}
                  </div>
                </div>

                <div className="mt-8 w-full space-y-3">
                  <ProfileInfoItem
                    icon={<Mail size={18} />}
                    label="Email address"
                    value={user?.email}
                  />

                  <ProfileInfoItem
                    icon={<Phone size={18} />}
                    label="Contact number"
                    value={user?.contactNumber}
                  />

                  <ProfileInfoItem
                    icon={<CalendarDays size={18} />}
                    label="Member since"
                    value={formatJoinedDate(
                      user?.createdAt,
                    )}
                  />
                </div>

                <div className="mt-8 w-full rounded-2xl border border-sky-100 bg-sky-50 p-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white p-2 text-[#1b71a7] shadow-sm">
                      <UserRound size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Profile information
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Keep your personal information
                        and profile image up to date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right content */}
            <section className="min-w-0 space-y-6">
              {/* WebDAV card */}
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                          WebDAV Access
                        </h2>

                        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                          Private credentials
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        Download and run the automatic
                        WebDAV connection script for your
                        device.
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        {getOperatingSystemIcon()}
                        {getOperatingSystemLabel()}
                      </span>

                      <Button
                        type="primary"
                        size="large"
                        icon={<Download size={18} />}
                        loading={webDavLoading}
                        disabled={
                          !detectedOS ||
                          detectedOS === 'ios' ||
                          detectedOS === 'unsupported'
                        }
                        onClick={handleConnectWebDAV}
                        className="flex items-center justify-center"
                      >
                        {webDavLoading
                          ? 'Preparing Script'
                          : 'Connect WebDAV'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid gap-5 md:grid-cols-2">
                    <CredentialCard
                      label="Username"
                      value={user?.webdavUsername}
                      field="username"
                      copied={copied}
                      onCopy={copyToClipboard}
                    />

                    <CredentialCard
                      label="Password"
                      value={user?.webdavPassword}
                      field="password"
                      copied={copied}
                      onCopy={copyToClipboard}
                    />
                  </div>

                  <WebDAVInstructions os={detectedOS} />

                  <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                    <p className="text-xs leading-5 text-amber-700">
                      Do not share these credentials
                      publicly. Anyone with access may be
                      able to connect to your WebDAV
                      storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account settings */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Account Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update your profile details or change
                    your account password.
                  </p>
                </div>

                <Tabs
                  defaultActiveKey="editProfile"
                  items={tabItems}
                  size="large"
                  className="profile-tabs mt-5"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
}

function WebDAVInstructions({ os }) {
  if (os === 'windows') {
    return (
      <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 p-5">
        <h3 className="text-sm font-bold text-slate-800">
          Windows setup instructions
        </h3>

        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            Click the Connect WebDAV button.
          </li>
          <li>
            Make sure the downloaded file is named{' '}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
              connect-drive.bat
            </code>
            , not{' '}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
              connect-drive.bat.txt
            </code>
            .
          </li>
          <li>
            Do not run the file as administrator.
          </li>
          <li>
            Double-click the downloaded file normally.
          </li>
          <li>
            Select Yes when the Windows UAC prompt
            appears.
          </li>
          <li>
            The drive will appear as Z: in Windows
            Explorer.
          </li>
        </ol>
      </div>
    );
  }

  if (os === 'mac') {
    return (
      <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 p-5">
        <h3 className="text-sm font-bold text-slate-800">
          macOS setup instructions
        </h3>

        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            Click the Connect WebDAV button.
          </li>
          <li>
            Open the downloaded{' '}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
              mount-drive.scpt
            </code>{' '}
            file.
          </li>
          <li>
            Script Editor will open automatically.
          </li>
          <li>Click the Run button.</li>
          <li>
            Allow the required macOS permission prompt.
          </li>
          <li>
            The mounted drive will appear under Finder
            Locations.
          </li>
        </ol>
      </div>
    );
  }

  if (os === 'ios') {
    return (
      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-5">
        <p className="text-sm leading-6 text-orange-700">
          Automatic setup scripts cannot run on iPhone or
          iPad. Please open this page from a Windows PC or
          Mac.
        </p>
      </div>
    );
  }

  if (os === 'unsupported') {
    return (
      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-5">
        <p className="text-sm leading-6 text-orange-700">
          Automatic WebDAV setup currently supports only
          Windows and macOS.
        </p>
      </div>
    );
  }

  return null;
}

function ProfileInfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1b71a7] shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  );
}

function CredentialCard({
  label,
  value,
  field,
  copied,
  onCopy,
}) {
  const isCopied = copied === field;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-sky-50/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <code className="min-w-0 flex-1 truncate rounded-xl bg-white px-4 py-3 font-mono text-sm font-semibold text-slate-700 shadow-sm">
          {value || 'Not available'}
        </code>

        <button
          type="button"
          onClick={() => onCopy(value, field)}
          disabled={!value}
          aria-label={`Copy WebDAV ${label.toLowerCase()}`}
          title={`Copy ${label.toLowerCase()}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-[#1b71a7] focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCopied ? (
            <Check
              size={19}
              className="text-emerald-500"
            />
          ) : (
            <Copy size={19} />
          )}
        </button>
      </div>
    </div>
  );
}