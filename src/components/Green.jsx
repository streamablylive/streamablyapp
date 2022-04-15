import React, { useRef, useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectCameraStreamByPeerID,
} from "@100mslive/react-sdk";
import NewWindow from "react-new-window";
import { Rnd } from 'react-rnd';

const Green = () => {
  const peer = useHMSStore(selectPeers);
  return (
    <NewWindow
    features={{
      width: 1000,
      height: 650,
      toolbar: "no",
      menubar: "no",
      location: "no",
      scrollbars: "no",
      status: "no",
    }}
    title="capture screen"
  >
    <div className='w-full h-full bg-green-500'>
      <Rnd
        default={{
          x: 10,
          y: 10,
          width: 320,
          height: 200,
        }}
      >
      <div className='bg-white h-full w-full '>
        <VideoTile peer={peer[0]} />
      </div>
      </Rnd>
    </div>

  </NewWindow>
  )
}

export default Green


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
