import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST } from "../../apihelper/apihelper";
import { AppContext } from "../../100ms/components/context/AppContext";
toast.configure();

const Homejoin = () => {
  const [loading, setloading] = useState(false);
  const [itoken, setitoken] = useState("");
  const { setLoginInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const Toast = (data, b) => {
    toast(data, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
      theme: "dark",
      type: b,
    });
  };

  const handleiSubmit = async () => {
    if (itoken !== "") {
      setloading(true);
      const body = { token: itoken };
      const { data: res } = await POST("getroomidfromtoken", body);
      setloading(false);
      if (res !== "invalid") {
        setitoken("");
        if (res === "not allowed") {
          Toast("code not allowed", "error");
        } else if (res === "limit") {
          Toast("Code Validity expired", "warning");
        } else if (res === "room not started") {
          Toast("Room not started", "warning");
        } else {
          setLoginInfo({ roomId: res, role: "wait" });
          navigate("/r/preview");
        }
      } else {
        Toast("Error", "error");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full">
        <input
          onChange={e => setitoken(e.target.value)}
          value={itoken}
          type="text"
          placeholder="Paste the code to Join instantly "
          className="w-full pr-16 input input-primary input-bordered bg-[#212529] border-2 rounded-full text-white"
        />
        <button
          onClick={loading ? null : handleiSubmit}
          className="absolute top-0 right-0 rounded-l-none btn btn-primary rounded-full"
        >
          {loading ? (
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
                  <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
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
            "Join"
          )}
        </button>
      </div>
    </div>
  );
};

export default Homejoin;
