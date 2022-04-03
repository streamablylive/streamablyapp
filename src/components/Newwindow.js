import React from "react";
import {
  useHMSStore,
  selectPeers,
  selectIsSomeoneScreenSharing,
  selectPeerSharingVideoPlaylist,
  selectVideoTrackByPeerID,
} from "@100mslive/react-sdk";
import { Box, Video } from "@100mslive/react-ui";
import { VideoPlayer } from "../100ms/components/Playlist/VideoPlayer";

import NewWindow from "react-new-window";

const Newwindows = ({ s }) => {
  const peer = useHMSStore(selectPeers);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peerSharingPlaylist = useHMSStore(selectPeerSharingVideoPlaylist);
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
          <Box
            css={{
              mx: "$4",
              flex: "3 1 0",
              "@lg": {
                flex: "2 1 0",
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <VideoPlayer peerId={peerSharingPlaylist.id} />
          </Box>
        </NewWindow>
      ) : null}
    </>
  );
};

export default Newwindows;

const VideoTile = ({ peer }) => {
  const track = useHMSStore(selectVideoTrackByPeerID(peer.id));
  const isVideoDegraded = track?.degraded;
  return (
    <React.Fragment>
      {track ? (
        <Video
          trackId={track?.id}
          attach={true}
          mirror={peer?.isLocal && track?.source === "regular"}
          degraded={isVideoDegraded}
          data-testid="participant_video_tile"
        />
      ) : null}
    </React.Fragment>
  );
};
