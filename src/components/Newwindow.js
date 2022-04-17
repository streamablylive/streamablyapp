import React from "react";
import {
  useHMSStore,
  selectIsPeerVideoEnabled,
  selectPeers,
  selectVideoTrackByPeerID,
} from "@100mslive/react-sdk";
import { Video } from "@100mslive/react-ui";
// import { VideoPlayer } from "../100ms/components/Playlist/VideoPlayer";

import NewWindow from "react-new-window";

const Newwindows = ({ s }) => {
  const peer = useHMSStore(selectPeers);
  // const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  // const presenter = useHMSStore(selectPeerScreenSharing);
  return (
    <>
      {peer.map(peer => (
        <Tile key={peer.id} peer={peer} s={s} />
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

const Tile = ({ peer, s }) => {
  const track = useHMSStore(selectVideoTrackByPeerID(peer.id));
  const isVideoMuted = !useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const isVideoDegraded = track?.degraded;
  if (isVideoMuted || !track) {
    return null;
  }
  return (
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
      <Video
        trackId={track?.id}
        attach={true}
        mirror={peer?.isLocal && track?.source === "regular"}
        degraded={isVideoDegraded}
        data-testid="participant_video_tile"
      />
    </NewWindow>
  );
};
