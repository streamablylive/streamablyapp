import {
  useHMSActions,
  useHMSStore,
  selectPeerMetadata,
  selectLocalPeerID,
} from "@100mslive/react-sdk";

export const useMyMetadata = () => {
  const hmsActions = useHMSActions();
  const localPeerId = useHMSStore(selectLocalPeerID);
  const metaData = useHMSStore(selectPeerMetadata(localPeerId));
  let isHandRaised = metaData?.isHandRaised || false;
  let isBRBOn = metaData?.isBRBOn || false; // BRB = be right back
  let isLive = metaData?.isLive || false;

  const update = async updatedFields => {
    try {
      await hmsActions.changeMetadata(Object.assign(metaData, updatedFields));
    } catch (error) {
      console.error("failed to update metadata ", metaData, updatedFields);
    }
  };

  const peerMetaData=(peerId)=>{
    return useHMSStore(selectPeerMetadata(peerId))
  }

  const toggleHandRaise = async () => {
    isHandRaised = !isHandRaised;
    isBRBOn = isHandRaised ? false : isBRBOn; // turn off brb if hand is raised
    await update({ isHandRaised, isBRBOn });
  };

  const toggleBRB = async () => {
    isBRBOn = !isBRBOn;
    isHandRaised = isBRBOn ? false : isHandRaised; // turn off hand raise if user is going away(brb on)
    await update({ isHandRaised, isBRBOn });
  };

  const toggleLive = async (url) => {
    isLive = url;
    await update({ isLive });
  }

  return {
    isHandRaised,
    isBRBOn,
    isLive,
    metaData,
    updateMetaData: update,
    peerMetaData,
    toggleHandRaise,
    toggleBRB,
    toggleLive
  };
};
