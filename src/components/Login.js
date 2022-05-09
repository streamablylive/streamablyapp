import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity";

const Login = () => {
  const { loginUser, signupUser } = useIdentityContext();
  const [login, setL] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");
  const [wname, setWname] = useState("");
  const signup = e => {
    e.preventDefault();
    const data = { web_name: wname, full_name: name };
    signupUser(email, password, data)
      .then(user => {
        console.log("Success! Signed up", user);
      })
      .catch(err => console.error(err));
  };
  const hlogin = e => {
    e.preventDefault();
    loginUser(email, password, true)
      .then(user => {
        console.log("Success! Logged in", user);
      })
      .catch(err => console.error(err));
  };
  return (
    <>
      <img
        alt="bg"
        src={login ? "./Rectangle.jpg" : "./Rectangle1.jpg"}
        className="w-full h-full"
      />
      <div
        src="https://picsum.photos/200/300?random=1"
        className="absolute inset-0  w-full h-full flex flex-col items-center justify-center text-white"
      >
        <div className="w-[270px] sm:w-[450px]  bg-[#312D2D] card rounded-3xl py-4 px-2 flex flex-col items-center shadow-lg">
          <div className="w-[250px] mt-20 mb-5">
            <p className=" text-2xl font-bold ">
              {login ? "Log in to Streamably!" : "Create an Account"}
            </p>
          </div>
          <form
            onClick={login ? hlogin : signup}
            className="flex flex-col items-center"
          >
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="E-mail"
              className="input  w-[250px] sm:w-[350px] mb-5 "
            />
            <input
              value={password}
              onChange={e => setpassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              className="input w-[250px] sm:w-[350px] mb-5 "
            />
            {login ? null : (
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="name"
                name="name"
                placeholder="Name"
                className="input w-[250px] sm:w-[350px] mb-5 "
              />
            )}
            {login ? null : (
              <input
                value={wname}
                onChange={e => setWname(e.target.value)}
                type="name"
                name="wname"
                placeholder="Web Name"
                className="input w-[250px] sm:w-[350px] mb-5 "
              />
            )}
            <button type="submit" className="btn w-40 btn-primary rounded-lg">
              {login ? "Log in" : "Sign up"}
            </button>
            <p className="mt-5 mb-1 text-sx text-primary">Forgot Password?</p>
            <p
              onClick={() => {
                setL(!login);
              }}
              className=" mb-5 text-sx hover:underline text-primary"
            >
              {login
                ? "New here? Create an account"
                : "Already have an Account? Login"}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
