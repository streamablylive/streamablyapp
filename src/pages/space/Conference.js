import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppContext } from "../../100ms/components/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../../100ms/components/Header/Header";
import { Footer } from "../../100ms/components/Footer";
import { ConferenceMainView } from "../../100ms/layouts/mainView";
import {
  selectIsConnectedToRoom,
  useHMSStore,
  selectRoomState,
  HMSRoomState,
} from "@100mslive/react-sdk";
import FullPageProgress from "../../100ms/components/FullPageSpinner";
import Right from "../../100ms/components/Right";
import { RoleChangeRequestModal } from "../../100ms/components/RoleChangeRequestModal";

const Conference = () => {
  const navigate = useNavigate();
  const { loginInfo } = useContext(AppContext);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [, setIsParticipantListOpen] = useState(false);
  const toggleChat = useCallback(() => {
    setIsChatOpen(open => !open);
  }, []);
  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom);
  const isConnectingToRoom =
    useHMSStore(selectRoomState) === HMSRoomState.Connecting;
  const onParticipantListOpen = useCallback(value => {
    setIsParticipantListOpen(value);
  }, []);

  const isHeadless = loginInfo.isHeadlessMode;
  const roomId = loginInfo.roomId;

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
    if (!(isConnectingToRoom || isConnectedToRoom)) {
      navigate("/r/preview");
    }
    if (!loginInfo.token) {
      navigate(`/r/preview/`);
      console.log(roomId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isConnectedToRoom) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <FullPageProgress />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex  bg-transparent">
      <div className="h-full  flex-grow flex flex-col">
        {!isHeadless && (
          <div className="h-14 w-full md:h-16 bg-transparent">
            <Header onParticipantListOpen={onParticipantListOpen} />
          </div>
        )}

        <div className="w-full flex-grow flex  flex-col">
          <ConferenceMainView />
        </div>
        {!isHeadless && (
          <div className="dark:bg-transparent px-4 h-[14%] md:h-[10%]">
            <Footer isChatOpen={isChatOpen} toggleChat={toggleChat} />
          </div>
        )}
      </div>
      <Right isChatOpen={isChatOpen} toggleChat={toggleChat} />
      <RoleChangeRequestModal />
    </div>
  );
};
export default Conference;
