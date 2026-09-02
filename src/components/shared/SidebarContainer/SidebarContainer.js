'use client';
import './Sidebar.css';
import logo from '../../../assets/logos/logo.png';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Album, Building2, ScrollText, Users } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { SlidersVertical } from 'lucide-react';
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout, selectToken } from '@/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(selectToken);
  const [role, setRole] = useState(null);

  // Decode token and set role on mount or token change
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded);
      } catch (error) {
        console.error('Token decoding error:', error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      // Dispatch logout action and wait for it to complete
      await dispatch(logout());
      // Show success toast
      toast.success('Logout successful');
      // Navigate to login page
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
      // Still navigate to login page on error to avoid being stuck
      router.replace('/login');
    }
  };

  // Handle menu item clicks
  const onClick = (e) => {
    if (e.key === 'logout') {
      handleLogout();
    }
  };

  const navlinks = {
    admin: [
      {
        key: 'dashboard',
        icon: <House size={21} strokeWidth={2} />,
        label: <Link href={'/admin/dashboard'}>Dashboard</Link>,
      },
      {
        key: 'companies',
        icon: <Building2 size={21} strokeWidth={2} />,
        label: <Link href={'/admin/compani-details'}>Companies</Link>,
      },
      {
        key: 'settings',
        icon: <SlidersVertical size={21} strokeWidth={2} />,
        label: 'Settings',
        children: [
          {
            key: 'privacy-policy',
            icon: <ScrollText size={21} strokeWidth={2} />,
            label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
          },
          {
            key: 'terms-conditions',
            icon: <ScrollText size={21} strokeWidth={2} />,
            label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
          },
        ],
      },

      {
        key: 'logout',
        icon: <LogOut size={21} strokeWidth={2} />,
        label: <Link href="/login">Logout</Link>,
      },
    ],
    project_manager: [
      {
        key: 'dashboard',
        icon: <House size={21} strokeWidth={2} />,
        label: <Link href={'/admin/dashboard'}>Dashboard</Link>,
      },
      {
        key: 'worker',
        icon: <Users size={21} strokeWidth={2} />,
        label: <Link href={'/admin/workers'}>Workers</Link>,
      },

      // {
      //   key: 'worker-upload',
      //   icon: <Album size={21} strokeWidth={2} />,
      //   label: <Link href={'/admin/images-uploaded-by-workers'}>Worker Upload</Link>,
      // },
      {
        key: 'project-and-folder-management',
        icon: <Album size={21} strokeWidth={2} />,
        label: (
          <Link href={'/admin/project-and-folder-management'}>Project & Folder Management</Link>
        ),
      },

      {
        key: 'logout',
        icon: <LogOut size={21} strokeWidth={2} />,
        label: <Link href="/login">Logout</Link>,
      },
    ],
  };
  const links = navlinks[role?.role] || [];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace('/admin/', '')?.split(' ')[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? '10px' : '4px'}`,
        paddingBlock: '30px',
        backgroundColor: '#EEF3FD',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col justify-center items-center gap-y-5">
        <Link href={'/'}>
          {collapsed ? (
            // Logo small
            <Image src={logo} alt="Logo Of Before After Story" className="h-4 w-auto" />
          ) : (
            <Image src={logo} alt="Logo Of Before After Story" className="h-24 w-auto" />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !bg-transparent space-y-2.5 !border-none"
        items={links}
      />
    </Sider>
  );
};

export default SidebarContainer;
