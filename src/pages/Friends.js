import React, { useState } from "react";
import Friendadd from "../components/frnd/Friendadd";
import Friendslist from "../components/frnd/friendslist";
import { RiPencilFill } from "react-icons/ri";
const Friends = () => {
  const [open, setopen] = useState(false);

  return (
    <div className="w-full h-full overflow-y-hidden">
      <div className="h-[600px] w-3/4 mx-auto mt-10 p-0.5  bg-gradient-to-b from-primary to-transparent rounded-lg">
        <div className="p-0.1 h-[600px] rounded-lg  gradient-border-2 border-gradient-b-green-blue bg-gradient-to-b from-gray2 to-bg overflow-hidden">
          <Friendslist />
        </div>
      </div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
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
          <Friendadd />
        </div>
      </div>
      <button
        onClick={() => setopen(true)}
        className="absolute bottom-16 sm:bottom-10 right-5 sm:right-10 btn  btn-primary btn-circle btn-md "
      >
        <RiPencilFill color="black" size="30px" />
      </button>
    </div>
  );
};

export default Friends;
