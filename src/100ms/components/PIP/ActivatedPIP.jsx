import { useEffect,useState } from "react";
import { PictureInPicture } from "./PIPManager";
import {
  selectTracksMap,
  useHMSStore,
  useHMSActions,
  selectLocalPeer,
  selectDominantSpeaker,
  selectRemotePeers,
} from "@100mslive/react-sdk";
import { GridCenterView } from "../gridView";

const ActivatedPIP = ({ setIsPipOn }) => {
  const hmsActions = useHMSActions();
  const tracksMap = useHMSStore(selectTracksMap);
  const remotePeers = useHMSStore(selectRemotePeers);
  const localPeer = useHMSStore(selectLocalPeer);
  let [activeSpeaker, setActiveSpeaker] = useState(localPeer);
  let dominantSpeaker = useHMSStore(selectDominantSpeaker);

  const peerFilter = dominantSpeaker => {
    if (dominantSpeaker) {
      setActiveSpeaker(dominantSpeaker);
    }
  };

  useEffect(() => {
    peerFilter(dominantSpeaker);
  }, [dominantSpeaker]);

  useEffect(() => {
    const startPip = async () => {
      await PictureInPicture.start(hmsActions, setIsPipOn);
      await PictureInPicture.updatePeersAndTracks(remotePeers, tracksMap);
    };
    startPip().catch(err => console.error("error in starting pip", err));

    return () => {
      PictureInPicture.stop().catch(err =>
        console.error("error in stopping pip", err)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hmsActions, setIsPipOn]);

  useEffect(() => {
    PictureInPicture.updatePeersAndTracks(remotePeers, tracksMap).catch(err => {
      console.error("error in updating pip", err);
    });
  }, [tracksMap, remotePeers]);

  return (
    <div className="w-full h-full">
      <GridCenterView
        peers={[activeSpeaker]}
        maxTileCount={1}
        allowRemoteMute={false}
        totalPeers={1}
      />
      ada
    </div>
  );
};

export default ActivatedPIP;
