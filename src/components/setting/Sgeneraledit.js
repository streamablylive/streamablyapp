import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity";

const Sgeneraledit = () => {
  const { updateUser, user } = useIdentityContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wname, setwname] = useState("");
  const handles = async () => {
    let cname = name === "" ? user.user_metadata.name : name;
    let cemail = email === "" ? user.email : email;
    let cwname = wname === "" ? user.user_metadata.web_name : wname;
    await updateUser({
      user_metadata: {
        web_name: cwname,
        full_name: cname,
      },
      email: cemail,
    });
    console.log(cname, cwname, cemail, "a");
  };
  return (
    <div className=" w-full h-full bg-gradient-to-br from-primary via-transparent to-primary rounded-lg p-0.5 ">
      <div className=" bg-custom-gray w-full h-full rounded-lg flex flex-col items-center py-4 px-6">
        <p className="text-3xl mt-4 mb-3">Edit your info</p>
        <div className="flex items-center w-full mt-5">
          <p className="text-xl w-28 align-middle">Name:</p>
          <input
            placeholder={user.user_metadata.full_name}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-[65%] ml-4 px-2 h-10 input bg-gray2"
          />
        </div>
        <div className="flex items-center w-full mt-5">
          <p className="text-xl w-28 align-middle">Email:</p>
          <input
            placeholder={user.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-[65%] ml-4 px-2 h-10 input bg-gray2"
          />
        </div>
        <div className="flex items-center w-full mt-5">
          <p className="text-xl w-28 align-middle">Web Name:</p>
          <input
            placeholder={user.user_metadata.web_name}
            value={wname}
            onChange={e => setwname(e.target.value)}
            className="w-[65%] ml-4 px-2 h-10 input bg-gray2"
          />
        </div>
        <div className="w-full flex-row-reverse flex mt-6">
          <button onClick={handles} className="btn btn-primary ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sgeneraledit;
