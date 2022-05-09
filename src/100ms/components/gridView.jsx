import React, { Fragment } from "react";
import { useMedia } from "react-use";
import { Box, Flex, config as cssConfig } from "@100mslive/react-ui";
import VideoList from "./VideoList";

const MAX_TILES_FOR_MOBILE = 4;

/**
 * the below variables are for showing webinar etc. related image if required on certain meeting urls
 */
// const webinarProps = JSON.parse(process.env.REACT_APP_WEBINAR_PROPS || "{}");
// const eventRoomIDs = webinarProps?.ROOM_IDS || [];
// const eventsImg = webinarProps?.IMAGE_FILE || ""; // the image to show in center
// // the link to navigate to when user clicks on the image
// const webinarInfoLink = webinarProps?.LINK_HREF || "https://100ms.live/";

// The center of the screen shows bigger tiles
export const GridCenterView = ({
  peers,
  maxTileCount,
  showStatsOnTiles,
  isAudioOnly,
}) => {
  const mediaQueryLg = cssConfig.media.md;
  const limitMaxTiles = useMedia(mediaQueryLg);
  return (
    <Fragment>
      <Box
        css={{
          flex: "1 1 0",
          height: "100%",
          "@md": { flex: "2 1 0" },
        }}
      >
      
        {peers && peers.length > 0 ? (
          <VideoList
            showStatsOnTiles={showStatsOnTiles}
            peers={peers}
            isAudioOnly={isAudioOnly}
            maxTileCount={limitMaxTiles ? MAX_TILES_FOR_MOBILE : maxTileCount}
          />
        ) : null}
      </Box>
    </Fragment>
  );
};

// Side pane shows smaller tiles
export const GridSidePaneView = ({
  peers,
  showStatsOnTiles,
  isAudioOnly,
}) => {
  return (
    <Flex
      direction="column"
      css={{
        flex: "0 0 20%",
        mx: "$4",
        "@lg": {
          flex: "0 0 25%",
        },
        "@md": {
          flex: "1 1 0",
        },
      }}
    >
      <Flex css={{ flex: "1 1 0" }} align="end">
        {peers && peers.length > 0 && (
          <VideoList
            showStatsOnTiles={showStatsOnTiles}
            isAudioOnly={isAudioOnly}
            peers={peers}
            maxColCount={1}
          />
        )}
      </Flex>
    </Flex>
  );
};
