import React, { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  selectHMSMessages,
  selectLocalPeerID,
  selectMessagesByPeerID,
  selectMessagesByRole,
  selectPeerNameByID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import {  styled, Text } from "@100mslive/react-ui";

const formatTime = date => {
  if (!(date instanceof Date)) {
    return "";
  }
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return `${hours}:${mins}`;
};

const MessageType = ({ roles, hasCurrentUserSent, receiver }) => {
  const peerName = useHMSStore(selectPeerNameByID(receiver));
  if (receiver) {
    return (
      <p className="text-xs text-white">
        {hasCurrentUserSent ? `to ${peerName}` : "to me"}
        <span className="text-red-700 ml-1 mr-3">
          (Privately)
        </span>
      </p>
    );
  }

  if (roles && roles.length) {
    return (
      <Fragment>
        <p className="text-xs text-white">
          to
        </p>
        <span className="text-xs text-red-400 ml-1 mr-3">
          ({roles.join(",")})
        </span>
      </Fragment>
    );
  }
  return (
      <div className="flex ">
        <p className="text-white text-xs">to</p>
        <span className="ml-1 mr-3  text-xs">Everyone</span>
      </div>
  );
};

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const HIDDEN=
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const Link = styled("a", {
  color: "$brandDefault",
  wordBreak: "break-all",
  "&:hover": {
    textDecoration: "underline",
  },
});

const AnnotisedChat = ({ message }) => {
  
  return (
    <Fragment>
      {message
        .trim()
        .split(" ")
        .map(part =>
          URL_REGEX.test(part) ? (
            <Link
              href={part}
              key={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}{" "}
            </Link>
          ) : (
            `${part} `
          )
        )}
    </Fragment>
  );
};

const ChatMessage = React.memo(({ message }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const hmsActions = useHMSActions();
  const localPeerId = useHMSStore(selectLocalPeerID);

  useEffect(() => {
    if (message.id && !message.read && inView) {
      hmsActions.setMessageRead(true, message.id);
    }
  }, [message.read, hmsActions, inView, message.id]);

  return (
    <div ref={ref} className={"w-full flex flex-col mt-2 "+(message.sender === localPeerId?"items-end ":"items-start")} key={message.time}>
      <div className="flex flex-col min-w-[15%] max-w-[80%]">
        <p className=" my-2 text-white  p-2 bg-gray-900 rounded-lg">
          <AnnotisedChat message={message.message} />
        </p>
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-gray-300 text-xs mr-1">
              {message.senderName}
            </p>
            <MessageType
              hasCurrentUserSent={message.sender === localPeerId}
              receiver={message.recipientPeer}
              roles={message.recipientRoles}
              />
          </div>
          <p className="text-gray-300 text-xs mr-2">
            {formatTime(message.time)} 
          </p>
        </div>
      </div>
    </div>
  );
});

export const ChatBody = ({ role, peerId }) => {
  const storeMessageSelector = role
    ? selectMessagesByRole(role)
    : peerId
    ? selectMessagesByPeerID(peerId)
    : selectHMSMessages;
  const messages = useHMSStore(storeMessageSelector) || [];

  if (messages.length === 0) {
    return (
      <div className="flex w-full h-full align-center justify-center py-3">
        <Text>There are no messages here</Text>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="w-full h-full flex flex-col py-2 ">
      {messages.map(message => {
        return <ChatMessage key={message.id} message={message} />;
      })}
      </div>
    </Fragment>
  );
};
