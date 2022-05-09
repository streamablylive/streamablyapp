import React from "react";
import {  Text } from "@100mslive/react-ui";
// import PlaceholderBg from "../images/first_person.png";

export const FirstPersonDisplay = () => {
  return (
    <div className="relative overflow-hidden w-[37.5rem] max-w-[80%] h-full right-3 mx-auto ">
      <div className="flex items-center flex-col absolute w-full top-[33.33%] left-0 text-center">
        <Text color="white" variant="h4" css={{ "@md": { fontSize: "$md" } }}>
          Welcome!
        </Text>
        <Text
          color="white"
          variant="h6"
          css={{ mt: "$4", "@md": { fontSize: "$sm" } }}
        >
          You’re the first one here.
        </Text>
        <Text
          color="white"
          variant="h6"
          css={{ mt: "$2", "@md": { fontSize: "$sm" } }}
        >
          Sit back and relax till the others join.
        </Text>
      </div>
    </div>
  );
};
