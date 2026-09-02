import { Image, Modal } from "antd";
import React from "react";

export default function WorkerDetailsModal({ open, setOpen }) {
  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={null}
        width={600}
      >
        <h2 className="mb-5 text-center text-2xl font-semibold">
          Worker Details
        </h2>
        <div className="py-5">
          <div className="mb-8 flex justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-100">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Company Representative"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex">
              <span className="mr-3 text-base font-bold text-black">
                Worker Name :
              </span>
              <span className="text-base text-gray-600">John Doe </span>
            </div>

            <div className="flex">
              <span className="mr-3 text-base font-bold text-black">
                contact :
              </span>
              <span className="text-base text-gray-600">+018888888888</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
