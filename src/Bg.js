import { useNavigate, useLocation } from "react-router-dom";
import { useIdentityContext } from "react-netlify-identity";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import { BsFillPeopleFill, BsFillCameraVideoFill } from "react-icons/bs";

import { selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";

const Navbar = () => {
  const history = useNavigate();
  const [tab, settab] = useState("h");
  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom);
  const location = useLocation();
  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    settab(pathname);
  }, [location]);
  const change = tabno => {
    history("/" + tabno);
  };

  return (
    <div className=" bg-gray-600 w-screen sm:w-12 h-12 sm:flex-none sm:h-screen flex sm:flex-col flex-row justify-center ">
      <div className=" flex sm:flex-col bg-transparent  p-0 items-center justify-around w-40 sm:w-full">
        <div
          className={
            "  sm:ml-0 mt-0 sm:mt-4 px-4 sm:px-0 sm:py-2  w-18 sm:w-full h-full sm:h-10 flex items-center justify-center border-t-4 sm:border-r-4 sm:border-t-0 text-white  " +
            (window.location.pathname === "/"
              ? " border-white "
              : "  border-transparent")
          }
          onClick={() => change("")}
        >
          <AiFillHome size="25px" />
        </div>
        <div
          className={
            " ml-3 sm:ml-0 mt-0 sm:mt-4 px-4 sm:px-0 sm:py-2  w-18 sm:w-full h-full sm:h-10 flex items-center justify-center border-t-4 sm:border-r-4 sm:border-t-0 text-white " +
            (tab === "f" ? " border-white  " : " border-transparent")
          }
          onClick={() => change("f")}
        >
          <BsFillPeopleFill size="25px" />
        </div>
        <div
          className={
            " ml-3 sm:ml-0 mt-0 sm:mt-4 px-4 sm:px-0 sm:py-2  w-18 sm:w-full h-full sm:h-10 flex items-center justify-center border-t-4 sm:border-r-4 sm:border-t-0 text-white " +
            (tab === "r" ? " border-white " : "  border-transparent")
          }
          onClick={() => change(isConnectedToRoom ? "r/room" : "r/preview")}
        >
          <BsFillCameraVideoFill size="25px" />
        </div>
        <div
          className={
            " ml-3 sm:ml-0 mt-0 sm:mt-4 px-4 sm:px-0 sm:py-2  w-18 sm:w-full h-full sm:h-10 flex items-center justify-center border-t-4 sm:border-r-4 sm:border-t-0 text-white  " +
            (tab === "s" ? " border-white  " : " border-transparent")
          }
          onClick={() => change("s")}
        >
          <AiTwotoneSetting size="25px" />
        </div>
      </div>
    </div>
  );
};

function Layout({ children }) {
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;
  return (
    <>
      {isLoggedIn ? (
        <div className="w-screen h-screen flex flex-col-reverse sm:flex-row bg-bg overflow-hidden">
          <Navbar className="flex-none" />
          {children}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;
