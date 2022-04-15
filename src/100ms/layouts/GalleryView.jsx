import React, { useContext } from "react";
import {
  selectPeers,
  useHMSStore,
} from "@100mslive/react-sdk";
import { GridCenterView } from "../components/gridView";
import { AppContext } from "../components/context/AppContext";

export const GalleryView = ({ isAudioOnly }) => {
  const {
    showStatsOnTiles,
  } = useContext(AppContext);
  const peers = useHMSStore(selectPeers);
  return (
    <div className="w-full h-full flex flex-col  md:flex-row ">
      <GridCenterView
        peers={peers}
        maxTileCount={100}
        showStatsOnTiles={showStatsOnTiles}
        isAudioOnly={isAudioOnly}
      />
    </div>
  );
};
