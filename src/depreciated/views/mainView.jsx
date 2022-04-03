import React, {  useContext } from "react";
import {
  useHMSStore,
  selectPeerSharingAudio,
  selectPeerScreenSharing,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import { ScreenShareView } from "./screenShareView";
import { MainGridView } from "./mainGridView";
import { ActiveSpeakerView } from "./ActiveSpeakerView";
import { AppContext } from "../100ms/components/context/AppContext";
import { metadataProps as videoTileProps } from "../common/utils";

export const ConferenceMainView = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const peerSharing = useHMSStore(selectPeerScreenSharing);
  const peerSharingAudio = useHMSStore(selectPeerSharingAudio);
  const {  uiViewMode } = useContext(AppContext);

  if (!localPeer) {
    // we don't know the role yet to decide how to render UI
    return null;
  }

  let ViewComponent;
  if (
    (peerSharing && peerSharing.id !== peerSharingAudio?.id)
  ) {
    ViewComponent = ScreenShareView;
  }else if (uiViewMode === "activeSpeaker") {
    ViewComponent = ActiveSpeakerView;
  }else {
    ViewComponent = MainGridView;
  }
  return (
    <div className="w-[95%]  h-full flex justify-between bg-transparent px-3 py-6 rounded-3xl">
      {ViewComponent && 
        <ViewComponent   
          role={localPeer.roleName}
          videoTileProps={videoTileProps}
        />}
    </div>
    
  );
};
