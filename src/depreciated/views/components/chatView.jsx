import React from "react";
import {Chat} from "../../roomcomp/chat/Chat"

export const ChatView = ({ toggleChat }) => {
  return <Chat onClose={toggleChat} />;
};
