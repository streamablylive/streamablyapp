import React from "react";
import {
  useHMSStore,
  selectPeers,
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
} from "@100mslive/react-sdk";
import NewWindow from "react-new-window";
import VideoTile from "../100ms/components/VideoTile";

const Newwindows = ({ s }) => {
  const peer = useHMSStore(selectPeers);
  const presenter = useHMSStore(selectPeerScreenSharing);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
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
          <VideoTile key={peer.id} peer={peer} />
        </NewWindow>
      ))}
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
      ) : null}
    </>
  );
};

export default Newwindows;
