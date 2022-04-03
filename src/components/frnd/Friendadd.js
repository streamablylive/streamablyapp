import React, { useState } from "react";
import { mutate } from "swr";
import { POST } from "../../apihelper/apihelper";
import { useIdentityContext } from "react-netlify-identity";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";
toast.configure();

const Friendadd = () => {
  const identity = useIdentityContext();
  const uid = identity.user.id;
  const [token, settoken] = useState("");
  const [itoken, setitoken] = useState("");
  const [tvn, setTvn] = useState(2);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);

  const handleSubmit = async () => {
    //e.preventDefault();
    const body = { tvn: tvn, uid: uid };
    try {
      setloading(true);
      const { data: res, error } = await POST("gentokenfrnds", body);
      setloading(false);
      if (error) {
        Toast("Error", "error");
        return null;
      }
      if (res === "error") {
        Toast("Error", "error");
      } else {
        settoken(res);
        navigator.clipboard.writeText(res);
        Toast("code generate and copied!", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const Toast = (data, b) => {
    toast(data, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: "dark",
      type: b,
    });
  };

  const handleiSubmit = async () => {
    //e.preventDefault();
    const body = { token: itoken, uid: uid };
    console.log(body);
    if (itoken === "") {
      return null;
    }
    try {
      setloading2(true);
      const { data: res } = await POST("addfrnd", body);
      setloading2(false);
      if (res !== "invalid") {
        setitoken("");
        mutate("/.netlify/functions/getallfrnds");
        if (res === "added") {
          Toast("Friend was added!", "success");
        } else if (res === "invalid") {
          Toast("Invalid code", "error");
        } else if (res === "limit") {
          Toast("Code Validity expired", "warning");
        } else if (res === "already frnds") {
          Toast("Already Friends!", "info");
        }
      } else {
        Toast("Error", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full h-full bg-gradient-to-br from-primary via-transparent to-primary rounded-lg p-0.5 ">
      <div className="bg-custom-gray w-full h-full rounded-lg flex flex-col items-center">
        <div className="p-1 h-full flex flex-col items-center rounded-lg ">
          <div className="form-control w-[80%] h-12 my-10 ">
            <input
              readOnly
              type="text"
              placeholder="Click to Copy"
              onClick={() => {
                navigator.clipboard.writeText(token);
              }}
              value={token}
              className="w-full bg-[#212529] drop-shadow-2xl input input-primary input-borderedtext-white text-white border-2 rounded-full"
            />
          </div>
          <div className="px-6 w-60 sm:w-96 flex items-center justify-around ">
            <input
              onChange={e => setTvn(e.target.value)}
              value={tvn}
              type="range"
              min={1}
              max={10}
              className="range range-primary "
            />
            <p className="ml-1 w-4 text-white">{tvn}</p>
          </div>
          <button
            onClick={loading ? null : handleSubmit}
            className="btn w-[270px] mt-6 mb-10  rounded-2xl bg-[#2E3337] border-primary border-[1.5px] text-white"
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
                    <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                    <stop
                      stopColor="#fff"
                      stopOpacity=".631"
                      offset="63.146%"
                    />
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
                <p>Generate a referal code</p>
                <MdOutlineContentCopy color="white" size="20px" />
              </div>
            )}
          </button>
        </div>
        <div className="divider text-white w-[90%]">Add Friend</div>
        <div className="form-control w-[80%] h-12 mt-0 mb-10">
          <div className="relative">
            <input
              onChange={e => setitoken(e.target.value)}
              value={itoken}
              type="text"
              placeholder="Paste the code to add Friend "
              className="w-full pr-16 input input-primary input-bordered bg-[#212529] border-2 rounded-full text-white"
            />
            <button
              onClick={loading2 ? null : handleiSubmit}
              className="absolute top-0 right-0 rounded-l-none btn btn-primary  rounded-full"
            >
              {loading2 ? (
                <svg
                  height="50%"
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
                      <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                      <stop
                        stopColor="#fff"
                        stopOpacity=".631"
                        offset="63.146%"
                      />
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
                "Add"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendadd;
