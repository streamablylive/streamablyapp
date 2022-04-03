import React from "react";
import { Chat } from "./chat/Chat";

export const ChatView = ({ toggleChat }) => {
  return <Chat onClose={toggleChat} />;
};
