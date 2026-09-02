import { Image, Modal } from 'antd';
import React from 'react';

export default function CompanyDetailsModal({ open, setOpen }) {
  return (
    <div>
      <Modal open={open} onCancel={() => setOpen(false)} centered footer={null} width={600}>
        <h2 className="mb-5 text-center text-2xl font-semibold">Company Details</h2>
        <div className="py-5">
          <h2 className="mb-8 text-2xl font-bold text-black">Company Details</h2>

          <div className="mb-8 flex justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-100">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Company Representative"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <h3 className="mb-6 text-xl font-bold text-black">Company Details</h3>

          <div className="space-y-4">
            <div className="flex">
              <span className="mr-3 text-base font-bold text-black">Company Name :</span>
              <span className="text-base text-gray-600">BuildTech Company</span>
            </div>

            <div className="flex">
              <span className="mr-3 text-base font-bold text-black">Email Address :</span>
              <span className="text-base text-gray-600">BuildTech @gmail.com</span>
            </div>

            <div className="flex">
              <span className="mr-3 text-base font-bold text-black">Company contact :</span>
              <span className="text-base text-gray-600">+018888888888</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
