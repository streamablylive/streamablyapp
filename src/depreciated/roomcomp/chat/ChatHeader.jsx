import React from "react";
import {Text } from "@100mslive/react-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PeopleIcon,
} from "@100mslive/react-icons";

export const ChatHeader = React.memo(
  ({ selection, open ,onToggle}) => {
    return (
      <div onClick={onToggle} className="flex content-center  text-primary bg-gray-900 py-2  pl-8 pr-4 rounded-xl">
        <div className="flex content-center align-middle h-6 hover:cursor-pointer">
          <PeopleIcon />
          <Text css={{ mx: "$2"}}>{selection}</Text>
          {open ? (
            <ChevronUpIcon width={18} height={18} />
          ) : (
            <ChevronDownIcon width={18} height={18} />
          )}
        </div>
      </div>
    );
  }
);
