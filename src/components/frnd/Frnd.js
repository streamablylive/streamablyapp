import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useIdentityContext } from "react-netlify-identity";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { POST } from "../../apihelper/apihelper";
import { AppContext } from "../../100ms/components/context/AppContext";
import { toast } from "react-toastify";
toast.configure();

const Frnd = ({ data, o, of }) => {
  const { setLoginInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const identity = useIdentityContext();
  const suid = identity.user.id;

  const Toast = (data, b) => {
    toast(data, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: "dark",
      type: b,
    });
  };

  const join = async () => {
    const body = { uid: suid, fuid: data.uid };
    try {
      const { data: res } = await POST("fuidtoroomid", body);
      //alert(res);
      console.log(res);
      if (res === "no room") {
        Toast("Room not yet started", "error");
        return null;
      }
      setLoginInfo({ roomId: res, role: "wait", huid: data.uid });
      navigate("/r/preview");
    } catch (err) {
      console.error(err);
    }
  };

  const handledSubmit = async () => {
    //e.preventDefault();
    const body = { fuid: data.uid, uid: suid };
    console.log(body);
    try {
      //const {data:data} = useSWR("/.netlify/functions/addfrnd", ()=>POST(utoken,"addfrnd",body));
      const res = await POST("delfrnd", body);
      console.log(res);
      mutate("/.netlify/functions/getallfrnds");
    } catch (error) {
      console.error(error);
    }
  };

  const mountedStyle = { animation: "inAnimation 250ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  const h = e => {
    e.stopPropagation();
    o === data.uid ? of(null) : of(data.uid);
  };
  return (
    <div
      onClick={e => (o === data.uid ? h(e) : null)}
      className={
        " w-[80%] my-3 h-[130px] mx-auto self-align-center " +
        (o === data.uid
          ? "bg-gradient-to-br from-primary via-transparent to-primary  p-0.5 card shadow-2xl rounded-md z-1"
          : null)
      }
    >
      <div
        className={
          " w-full h-full rounded-md " +
          (o === data.uid
            ? " bg-custom-gray flex flex-wrap justify-around items-center"
            : null)
        }
      >
        <img
          onClick={h}
          alt="profile"
          src={`https://avatars.dicebear.com/api/micah/${data.uid}.svg?backgroundColor=grey`}
          className={
            " object-cover rounded-full border-primary border-2 " +
            (o === data.uid
              ? " h-20 w-20  hidden lg:block"
              : "mx-auto h-24 w-24")
          }
        />
        {o === data.uid ? (
          <div
            className="flex lg:flex-col items-center justify-around w-[40%] lg:w-[70px] -mb-8"
            style={o === data.uid ? mountedStyle : unmountedStyle}
          >
            <button
              onClick={join}
              className="btn btn-primary w-full mb-1 h-[40%] p-0 mr-1"
            >
              Join
            </button>
            <div className="flex items-center justify-between w-full h-full space-x-1 lg:space-x-0 place-self-center ">
              <button className="btn btn-info w-8 btn-outline  p-0">
                <AiFillHeart size="30px" />
              </button>
              <button
                onClick={handledSubmit}
                className="btn btn-error w-8 p-0 btn-outline "
              >
                <MdDelete size="30px" />
              </button>
            </div>
          </div>
        ) : null}
        {o === data.uid ? (
          <div className="w-full">
            {" "}
            <p
              style={o === data.uid ? mountedStyle : unmountedStyle}
              className="ml-4 text-[16px] mx-auto "
            >
              {data.name}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Frnd;
