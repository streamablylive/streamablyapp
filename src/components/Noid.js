import React, { useContext } from "react";
import { useIdentityContext } from "react-netlify-identity";
import { useNavigate } from "react-router-dom";
import { POST } from "../apihelper/apihelper";
import { AppContext } from "../100ms/components/context/AppContext";

const Noid = () => {
  const { setLoginInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const identity = useIdentityContext();
  const uid = identity.user.id;

  const join = async () => {
    const body = { uid: uid };
    try {
      const { data: res } = await POST("getroomid", body);
      //alert(res);
      console.log(res);
      setLoginInfo({ roomId: res, role: "host", huid: uid });
      navigate("/r/preview");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* <div className='w-[270px] sm:w-[450px] h-[420px] bg-[#312D2D] card rounded-3xl py-4 px-2 flex flex-col items-center shadow-lg'> */}
      <div>
        <h1 className="text-4xl text-primary font-mono subpixel-antialiased font-medium">
          Hey! Start your own space or join someones
        </h1>
      </div>
      <div className="mt-5 sm:mt-20 flex flex-col items-center">
        <button
          onClick={join}
          type="button"
          className="py-3 px-6 w-52 lg:w-96 h-16  btn btn-outline btn-primary  rounded-full"
        >
          Start a Stream Space
        </button>
      </div>
    </div>
  );
};

export default Noid;
