import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { POST } from "../../apihelper/apihelper";
import { useIdentityContext } from "react-netlify-identity";
import Frnd from "./Frnd";

const Friendslist = () => {
  const [reload, setreload] = useState(false);
  const identity = useIdentityContext();
  const uid = identity.user.id;
  const [query, setquery] = useState("");
  const [open, setopen] = useState(null);
  const post = async () => {
    const b = (await POST("getallfrnds", { uid: uid })).data;
    return b;
  };
  const { data } = useSWR("/.netlify/functions/getallfrnds", () => post(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const reloadf = () => {
    setreload(true);
    mutate("/.netlify/functions/getallfrnds");
    setreload(false);
  };
  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto">
      <div className=" relative w-full  h-24 flex  items-center  bg-transparent">
        <input
          value={query}
          onChange={e => setquery(e.target.value)}
          type="text"
          placeholder="Search Friend"
          className="w-1/2 my-5 mx-auto  z-10 input input-primary input-bordered bg-custom-gray  border-2 rounded-full"
        />
        <button
          className="p-0 btn btn-primary btn-circle absolute right-10"
          onClick={reload ? null : reloadf}
        >
          {reload ? (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="w-full  h-[90%] grid grid-cols-1    justify-items-center justify-around sm:grid-cols-3 ">
        {data
          ?.filter(list => {
            if (query === "") {
              return list;
            } else if (list.name.toLowerCase().includes(query.toLowerCase())) {
              return list;
            }
            return null;
          })
          .map(a => (
            <Frnd data={a} o={open} of={setopen} key={a.uid} />
          ))}
      </div>
    </div>
  );
};

export default Friendslist;
