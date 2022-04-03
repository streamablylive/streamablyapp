import React, { useCallback, useRef } from "react";
import {  IconButton, styled } from "@100mslive/react-ui";
import { useHMSActions } from "@100mslive/react-sdk";
import { ToastManager } from "../Toast/ToastManager";
import { SendIcon } from "@100mslive/react-icons";
import SecretMsg from "./SecretMsg";

const TextArea = styled("textarea", {
  width: "100%",
  bg: "transparent",
  color: "$textPrimary",
  resize: "none",
  lineHeight: "1rem", 
  "&:focus": {
    boxShadow: "none",
    outline: "none",
  },
});

export const ChatFooter = ({ role, peerId, onSend, children }) => {
  const hmsActions = useHMSActions();
  const inputRef = useRef(null);
  const sendMessage = useCallback(async () => {
    const message = inputRef.current.value;
    if (!message || !message.trim().length) {
      return;
    }
    try {
      if (role) {
        await hmsActions.sendGroupMessage(message, [role]);
      } else if (peerId) {
        await hmsActions.sendDirectMessage(message, peerId);
      } else {
        await hmsActions.sendBroadcastMessage(message);
      }
      inputRef.current.value = "";
      onSend();
    } catch (error) {
      ToastManager.addToast({ title: error.message });
    }
  }, [role, peerId, hmsActions, onSend]);
  return (
    <div className="flex bg-gray-900 items-center rounded-xl min-h-16 max-h-24 relative py-2 pl-3">
      {children}
      <TextArea
        placeholder="Write something here"
        ref={inputRef}
        onKeyPress={async event => {
          if (event.key === "Enter") {
            if (!event.shiftKey) {
              event.preventDefault();
              await sendMessage();
            }
          }
        }}
      />
      <IconButton
        onClick={sendMessage}
        css={{ ml: "auto", height: "max-content", mr: "$4" }}
      >
        <SendIcon />
      </IconButton>
      <SecretMsg/>
    </div>
  );
};
