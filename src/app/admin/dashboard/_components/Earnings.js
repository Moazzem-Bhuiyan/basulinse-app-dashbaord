'use client';

import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white px-3 py-2 rounded-full text-sm font-medium">
        {Math.round(payload[0].value)} users
      </div>
    );
  }
  return null;
};

export default function UserStatistics({ userStats, onYearChange }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const data = userStats?.map((item) => ({ month: item.month, users: item.count })) || [];

  const handleChange = (date, dateString) => {
    // Date string will contain the selected year
    setSelectedYear(dateString);
    onYearChange(dateString);
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Users statistic</h2>
        <div>
          <DatePicker
            value={selectedYear ? moment(selectedYear, 'YYYY') : null}
            onChange={handleChange}
            picker="year"
            placeholder="Select Year"
            style={{ width: 120 }}
          />
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="#e5e7eb"
              horizontal={false}
              vertical={true}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis
              domain={[0, 12]}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: '#6b7280' }}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'transparent' }}
              position={{ y: -10 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#60a5fa"
              strokeWidth={6}
              dot={{ fill: '#60a5fa', strokeWidth: 0, r: 8 }}
              activeDot={{ r: 6, fill: '#60a5fa', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
