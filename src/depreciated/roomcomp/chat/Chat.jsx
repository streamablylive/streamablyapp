import React, { useCallback, useRef, useState } from "react";
import { Button } from "@100mslive/react-ui";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatSelector } from "./ChatSelector";
import {
  selectMessagesUnreadCountByPeerID,
  selectMessagesUnreadCountByRole,
  selectUnreadHMSMessagesCount,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ChevronDownIcon } from "@100mslive/react-icons";

export const Chat = ({ onClose }) => {
  const [chatOptions, setChatOptions] = useState({
    role: "",
    peerId: "",
    selection: "Everyone",
  });
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const bodyRef = useRef(null);
  const scrollToBottom = useCallback(() => {
    if (!bodyRef.current) {
      return;
    }
    bodyRef.current.scrollTo({
      top: bodyRef.current.scrollHeight,
    });
  }, []);
  return (
    <div className="flex flex-col h-full w-full px-4 ">
      <ChatHeader
        open={isSelectorOpen}
        selection={chatOptions.selection}
        onToggle={() => {
          setSelectorOpen(value => !value);
        }}
        onClose={onClose}
      />
      <div ref={bodyRef}  className={"w-full flex-grow relative "+(isSelectorOpen?" overflow-y-hidden":" overflow-y-auto ")}>
        <ChatBody role={chatOptions.role} peerId={chatOptions.peerId} />
        {isSelectorOpen && (
          <ChatSelector
            role={chatOptions.role}
            peerId={chatOptions.peerId}
            onSelect={data => {
              setChatOptions(state => ({
                ...state,
                ...data,
              }));
              setSelectorOpen(false);
            }}
          />
        )}

      </div>
      <ChatFooter
        role={chatOptions.role}
        peerId={chatOptions.peerId}
        onSend={scrollToBottom}
      >
        <NewMessageIndicator
          role={chatOptions.role}
          peerId={chatOptions.peerId}
          onClick={scrollToBottom}
          />
      </ChatFooter>
    </div>
  );
};

const NewMessageIndicator = ({ role, peerId, onClick }) => {
  const unreadCountSelector = role
    ? selectMessagesUnreadCountByRole(role)
    : peerId
    ? selectMessagesUnreadCountByPeerID(peerId)
    : selectUnreadHMSMessagesCount;

  const unreadCount = useHMSStore(unreadCountSelector);
  if (!unreadCount) {
    return null;
  }
  return (
    <div className="flex justify-center w-full top-0 left-0 absolute" >
      <Button onClick={onClick} css={{ p: "$2 $4", "& > svg": { ml: "$4" } }}>
        New Messages
        <ChevronDownIcon width={16} height={16} />
      </Button>
    </div>
  );
};
