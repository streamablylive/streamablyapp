import React, { useContext } from "react";
import {
  selectLocalPeerID,
  selectPeers,
  useHMSStore,
} from "@100mslive/react-sdk";
import { GridCenterView, GridSidePaneView } from "./components/gridView";
import { AppContext } from "../100ms/components/context/AppContext";

export const MainGridView = ({
  isChatOpen,
  toggleChat,
  isParticipantListOpen,
  videoTileProps,
}) => {
  const {
    maxTileCount,
    appPolicyConfig: { center: centerRoles = [], sidepane: sidepaneRoles = [] },
  } = useContext(AppContext);
  const peers = useHMSStore(selectPeers);
  const localPeerId = useHMSStore(selectLocalPeerID);
  const centerPeers = peers.filter(peer => centerRoles.includes(peer.roleName));
  const sidebarPeers = peers.filter(peer =>
    sidepaneRoles.includes(peer.roleName)
  );

  let showSidePane = centerPeers.length > 0 && sidebarPeers.length > 0;
  if (centerPeers.length === 0) {
    // we'll show the sidepane for banner in this case too if 1). it's only me
    // in the room. or 2). noone is publishing in the room
    const itsOnlyMeInTheRoom =
      peers.length === 1 && peers[0].id === localPeerId;
    const nooneIsPublishing = sidebarPeers.length === 0;
    showSidePane = itsOnlyMeInTheRoom || nooneIsPublishing;
  }

  return (
    <React.Fragment>
      <GridCenterView
        peers={showSidePane ? centerPeers : peers}
        maxTileCount={maxTileCount}
      />
      {showSidePane && (
        <GridSidePaneView
          peers={sidebarPeers}
        />
      )}
    </React.Fragment>
  );
};
