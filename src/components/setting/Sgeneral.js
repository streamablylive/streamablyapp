import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { RiPencilFill } from "react-icons/ri";
import Sgeneraledit from "./Sgeneraledit";

const Sgeneral = ({ i }) => {
  const uid = i.user.id;
  const name = i.user.user_metadata.full_name;
  const [open, setopen] = useState(false);
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div id="sgeneral" className="w-full h-full p-4 ">
      <div className="w-full rounded-lg px-4 py-8 flex  items-center space-x-12  bg-custom-gray">
        <div className="relative">
          <img
            alt="pfp"
            src={`https://avatars.dicebear.com/api/micah/${uid}.svg?backgroundColor=grey`}
            className="object-cover rounded-full h-32 w-32 ring ring-primary ring-offset-2 ring-offset-base-100"
          />
          <button className="w-12 h-12 p-0 bg-gray2 rounded-full btn absolute bottom-0 -right-4 flex flex-col items-center justify-center">
            <RiPencilFill color="white" size="25px" />
          </button>
        </div>
        <div className="">
          <p className="text-4xl mb-1">{name}</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <div className="w-full relative rounded-lg p-8 pt-4 mt-4 flex flex-col items-center justify-between bg-custom-gray">
        <div className=" w-full mt-4">
          <p className="text-gray-500">Your Name</p>
          <p className="text-2xl text-white">{name}</p>
        </div>
        <div className=" w-full mt-4">
          <p className="text-gray-500">Your Email</p>
          <p className="text-2xl text-white">{i.user.email}</p>
        </div>
        <div className=" w-full mt-4">
          <p className="text-gray-500">Your Web Name</p>
          <p className="text-2xl text-white">{i.user.user_metadata.web_name}</p>
        </div>
        <button
          onClick={() => setopen(true)}
          className="absolute top-4 right-4 btn  btn-primary"
        >
          edit
        </button>
      </div>
      <div className={open === true ? "modal modal-open" : "modal "}>
        <div className="modal-box  bg-[#212529]">
          <button
            onClick={() => setopen(false)}
            htmlFor="my-modal-2"
            className="absolute right-2 top-2 btn  btn-primary btn-circle btn-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <Sgeneraledit />
        </div>
      </div>
    </div>
  );
};

export default Sgeneral;
