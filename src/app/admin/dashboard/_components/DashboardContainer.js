'use client';
import CustomCountUp from '@/components/CustomCountUp/CustomCountUp';
import { Flex } from 'antd';
import { Users } from 'lucide-react';
import getFormatNumber from '@/utils/getFormatNumber';
import UserStatics from './Earnings';
import { useGetDashboardDataQuery } from '@/redux/api/dashboardApi';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/features/authSlice';
import { jwtDecode } from 'jwt-decode';
import AccDetailsTable from '../../compani-details/_components/AccDetailsTable';

export default function DashboardContainer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { data: dashboardMeta, isLoading, isError, error } = useGetDashboardDataQuery(currentYear);

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
  const meta = dashboardMeta?.data;
  if (isLoading)
    return (
      <div className="space-y-20">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '120px' }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '120px' }}
            block={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '320px' }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '320px' }}
            block={true}
          />
        </div>
      </div>
    );
  if (isError || !meta) return console.log('----------------er', error);

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  const userStats = [
    {
      key: 'totalUser',
      label: 'Total Companies',
      value: meta?.totalCompanyCount || 0,
    },
    {
      key: 'totalWorkers',
      label: 'Total Workers',
      value: meta?.totalUserCount || 0,
    },
  ];
  const CompanyStats = [
    {
      key: 'totalWorkerCount',
      label: 'Total Workers',
      value: meta?.totalWorkerCount || 0,
    },
    {
      key: 'totalImageCount',
      label: 'Total Images',
      value: meta?.totalImageCount || 0,
    },
  ];
  return (
    <div className="space-y-20">
      {/* User Stats Section */}

      {role?.role === 'admin' ? (
        <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-2 gap-5">
          {(userStats || []).map((stat, idx) => (
            <Flex
              key={idx}
              align="center"
              justify="between"
              gap={20}
              className="!w-full !justify-between rounded-xl bg-white p-5"
            >
              <div className="space-y-2 p-5">
                <p className="text-base font-medium text-[#33363F]">{stat.label}</p>

                <h2 className="!mt-1 text-3xl font-bold">
                  <CustomCountUp end={getFormatNumber(stat.value)} duration={2} separator="," />
                </h2>
              </div>

              <div className="flex-center aspect-square size-20 rounded-full bg-primary text-white">
                <Users color="#000000" size={42} />
              </div>
            </Flex>
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-2 gap-5">
          {(CompanyStats || []).map((stat, idx) => (
            <Flex
              key={idx}
              align="center"
              justify="between"
              gap={20}
              className="!w-full !justify-between rounded-xl bg-white p-5"
            >
              <div className="space-y-2 p-5">
                <p className="text-base font-medium text-[#33363F]">{stat.label}</p>

                <h2 className="!mt-1 text-3xl font-bold">
                  <CustomCountUp end={getFormatNumber(stat.value)} duration={2} separator="," />
                </h2>
              </div>

              <div className="flex-center aspect-square size-20 rounded-full bg-primary text-white">
                <Users size={42} />
              </div>
            </Flex>
          ))}
        </section>
      )}

      {/* company stasts */}

      {/* Charts */}
      <section className="flex-center-between xl:flex-row flex-col gap-10">
        <UserStatics userStats={meta?.userOverview} onYearChange={handleYearChange} />
      </section>

      {/* Recent Users Table */}
      <section>
        {/* <RecentUserTable /> */}
        {role?.role === 'admin' && <AccDetailsTable />}
      </section>
    </div>
  );
}
