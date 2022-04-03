import React from "react";
import { scroller } from "react-scroll";

const Settingsright = ({ i }) => {
  const uid = i.user.id;
  const name = i.user.user_metadata.full_name;
  const f = a => {
    scroller.scrollTo(a, {
      duration: 1500,
      delay: 50,
      smooth: true,
      containerId: "contain",
    });
    console.log(a);
  };
  return (
    <div className="w-64 h-full bg-[#4D555B] overflow-hidden flex-none">
      <div className="w-full h-64 bg-primary shadow-2xl rounded-bl-[100px]  flex  flex-col items-center  justify-center">
        <img
          alt="profile"
          src={`https://avatars.dicebear.com/api/micah/${uid}.svg?backgroundColor=grey`}
          className=" object-cover rounded-full shadow-2xl border-[#23272B] border-[10px]  h-32 w-32"
        />
        <p className="text-2xl text-white mt-1">{name}</p>
      </div>
      <div className="w-[80%] mt-8 mx-auto text-white">
        <p
          className="w-full text-2xl ml-1 hover:cursor-pointer"
          onClick={() => f("sgeneral")}
        >
          General
        </p>
        <div className="divider my-3"></div>
        <p
          className="w-full text-2xl ml-1 hover:cursor-pointer"
          onClick={() => f("stheme")}
        >
          Theme
        </p>
        <div className="divider my-3"></div>
        <p
          className="w-full text-2xl ml-1 hover:cursor-pointer"
          onClick={() => f("smic")}
        >
          Mic/Cam
        </p>
        <div className="divider my-3"></div>
        <p
          className="w-full text-2xl ml-1 hover:cursor-pointer"
          onClick={() => f("schange")}
        >
          Change log
        </p>
      </div>
    </div>
  );
};

export default Settingsright;
