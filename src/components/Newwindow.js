import React, { useRef, useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  // selectIsSomeoneScreenSharing,
  // selectPeerScreenSharing,
  // selectPeerSharingVideoPlaylist,
  selectCameraStreamByPeerID,
} from "@100mslive/react-sdk";
// import { VideoPlayer } from "../100ms/components/Playlist/VideoPlayer";

import NewWindow from "react-new-window";

const Newwindows = ({ s }) => {
  const peer = useHMSStore(selectPeers);
  // const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  // const presenter = useHMSStore(selectPeerScreenSharing);
  return (
    <>
      {peer.map(peer => (
        <NewWindow
          onUnload={() => s(false)}
          key={peer.id}
          features={{
            width: 320,
            height: 180,
            toolbar: "no",
            menubar: "no",
            location: "no",
            resizable: "no",
            scrollbars: "no",
            status: "no",
          }}
          title={peer.name}
        >
          <VideoTile peer={peer} />
        </NewWindow>
      ))}
      {/* 
      {isSomeoneScreenSharing ? (
        <NewWindow
          key={peer.id}
          features={{
            width: 400,
            height: 180,
            toolbar: "no",
            menubar: "no",
            location: "no",
            resizable: "no",
            scrollbars: "no",
            status: "no",
          }}
          title="shared screen"
        >
          <VideoTile peer={presenter} showScreen={true} objectFit="contain" />
        </NewWindow>
      ) : null} */}
    </>
  );
};

export default Newwindows;

const VideoTile = ({ peer }) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  useEffect(() => {
    console.log(peer);
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions, peer]);

  return (
    <video
      height="100%"
      width="100%"
      ref={videoRef}
      autoPlay
      muted
      playsInline
    ></video>
  );
};
