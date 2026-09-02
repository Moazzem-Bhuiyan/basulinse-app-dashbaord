"use client";

import { Modal } from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";

export default function ProfileModal({ open, setOpen }) {
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-gradient-to-br from-[#263238] to-[#1C3B47] py-4">
        <Image
          src={userImage}
          alt="user image"
          height={2400}
          width={2400}
          className="w-[30%] h-auto rounded-full aspect-square"
        />

        <h4 className="text-3xl font-bold text-white">
          BuildTech Ltd.
        </h4>
      </div>

      <div className=" grid grid-cols-1 gap-7 px-12 py-8 md:grid-cols-2 ">
        <div className="text-black">
          <h5 className=" font-bold">Company Name</h5>
          <p className="font-dmSans text-base">BuildTech</p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold"> Company Email</h5>
          <p className="font-dmSans text-base">justina@gmail.com</p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold">Company Contact</h5>
          <p className="font-dmSans text-base">+234 813 123 4567</p>
        </div>
      </div>
    </Modal>
  );
}
