import React, { useRef, useEffect,useState } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectCameraStreamByPeerID,
} from "@100mslive/react-sdk";
import NewWindow from "react-new-window";
import { Rnd } from 'react-rnd';

const Green = ({s}) => {
  const peer = useHMSStore(selectPeers);
  return (
    <NewWindow
    onUnload={() => s(false)}
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
      {peer.map(peer=> 
      <Rnd
        default={{
          x: 10,
          y: 10,
          width: 320,
          height: 245,
        }}
        style={{overflow:"hidden"}}
      >
        <Tile peer={peer} />
      </Rnd>)}
    </div>
  </NewWindow>
  )
}

export default Green


export const Tile = ({peer}) => {
  return (
    <div className=' h-fit w-fit '>
      <VideoTile peer={peer} />
    </div>
  )
}


const VideoTile = ({ peer }) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  useEffect(() => {
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
      ref={videoRef}
      autoPlay
      muted
      playsInline
    ></video>
  );
};

 