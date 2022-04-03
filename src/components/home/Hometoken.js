import React, { useState } from "react";
import { POST } from "../../apihelper/apihelper";
import { useIdentityContext } from "react-netlify-identity";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";

toast.configure();

const Hometoken = () => {
  const identity = useIdentityContext();
  const uid = identity.user.id;

  const [tokenno, settokenno] = useState(1);
  const [loading, setloading] = useState(false);
  const resetForm = () => {
    settokenno(1);
  };

  const Toast = data => {
    toast(data, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      theme: "dark",
    });
  };

  const handleSubmit = async () => {
    //e.preventDefault();
    const body = { tvn: tokenno, uid: uid };
    console.log(body);
    try {
      setloading(true);
      const { data: res } = await POST("gentokenroomid", body);
      setloading(false);
      resetForm();
      navigator.clipboard.writeText(res);
      console.log(res);
      Toast("code generated and copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-28 sm:mt-28  flex flex-col items-center">
      <div className="px-6 w-full flex">
        <input
          onChange={e => settokenno(e.target.value)}
          type="range"
          min="1"
          max="10"
          value={tokenno}
          className="range range-primary"
        />
        <p className="ml-1 w-3 text-white">{tokenno}</p>
      </div>

      <button
        className="btn w-[300px] mt-6 btn-neutral  p-0 "
        onClick={loading ? null : handleSubmit}
      >
        {loading ? (
          <svg
            height="80%"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="8.042%"
                y1="0%"
                x2="65.682%"
                y2="23.865%"
                id="a"
              >
                <stop stopColor="#fff" sstopOpacity="0" offset="0%" />
                <stop stopColor="#fff" sstopOpacity=".631" offset="63.146%" />
                <stop stopColor="#fff" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)">
                <path
                  d="M36 18c0-9.94-8.06-18-18-18"
                  id="Oval-2"
                  stroke="url(#a)"
                  strokeWidth="2"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </path>
                <circle fill="#fff" cx="36" cy="18" r="1">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          </svg>
        ) : (
          <div className="w-full flex justify-between px-2 items-center">
            <p>Generate a Guest referal code</p>
            <MdOutlineContentCopy color="white" size="20px" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Hometoken;
