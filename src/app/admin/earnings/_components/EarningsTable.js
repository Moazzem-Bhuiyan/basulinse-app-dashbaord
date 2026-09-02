"use client";

import { ConfigProvider, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import EarningModal from "./EarningModal";

// Dummy data
const earningStats = [
  {
    key: "today",
    title: "Today's Earning",
    amount: 500,
  },
  {
    key: "monthly",
    title: "This Month",
    amount: 2000,
  },
  {
    key: "yearly",
    title: "This Year",
    amount: 15000,
  },
  {
    key: "total",
    title: "Total Earnings",
    amount: 350000,
  },
];

// Dummy table data
const data = Array.from({ length: 7 }).map((_, inx) => ({
  key: inx + 1,
  name: "Booxos",
  userImg: userImage,
  status: "service Provider",
  contact: "+1234567890",
  date: "11 oct 24, 11.10PM",
  amount: 22,
  accNumber: "1234567890",
}));

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Name",
      dataIndex: "name",
    
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          ${value}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          ${value}
        </Tag>
      ),
    },
    {
      title: "ACC Number",
      dataIndex: "accNumber",
    },
    {
      title: "Join Date",
      dataIndex: "date",
    },

    // {
    //   title: "Pricing Plan",
    //   dataIndex: "pricingPlan",

    //   filters: [
    //     {
    //       text: "Monthly",
    //       value: "monthly",
    //     },
    //     {
    //       text: "Quarterly",
    //       value: "quarterly",
    //     },
    //     {
    //       text: "Yearly",
    //       value: "yearly",
    //     },
    //   ],
    //   filterIcon: () => (
    //     <Filter
    //       size={18}
    //       color="#fff"
    //       className="flex justify-start items-start"
    //     />
    //   ),
    //   onFilter: (value, record) => record.pricingPlan.indexOf(value) === 0,
    // },
    
    {
      title: "Action",
      render: () => (
        <Tooltip title="Show Details">
          <button onClick={() => setShowEarningModal(true)}>
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      {/* Earning stats */}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {earningStats?.map((stat) => (
          <div
            key={stat.key}
            className={clsx(
              "text-white text-lg flex-center-start gap-x-4 rounded-lg py-4 px-5",
              stat.key === "today"
                ? "bg-primary-blue"
                : "bg-foundation-accent-800"
            )}
          >
            <ArrowRightLeft size={24} />
            <p>
              {stat.title}
              <span className="font-semibold text-xl pl-3">${stat.amount}</span>
            </p>
          </div>
        ))}
      </section>

      {/* Earning table */}
      <section className="my-10">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          pagination
        ></Table>
      </section>

      {/* Show earning modal */}
      <EarningModal open={showEarningModal} setOpen={setShowEarningModal} />
    </ConfigProvider>
  );
}
