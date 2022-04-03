import React, { Fragment } from "react";
import { Box, Flex, Text } from "@100mslive/react-ui";
import VideoList from "../../roomcomp/VideoList";

// The center of the screen shows bigger tiles
export const GridCenterView = ({
  peers,
  showStatsOnTiles,
}) => {
  // const mediaQueryLg = cssConfig.media.md;
  return (
    <Fragment>
      <div className="h-full flex-grow">
      {peers && peers.length > 0 ? (
        <VideoList
          showStatsOnTiles={showStatsOnTiles}
          peers={peers}
          maxTileCount={2}
        />
      ) : <FirstPersonDisplay classes={{ rootBg: "h-full" }} />
      }
      </div>
    </Fragment>
  );
};

// Side pane shows smaller tiles
export const GridSidePaneView = ({
  peers,
  showStatsOnTiles,
}) => {
  return (
    <Flex
      direction="column"
      css={{
        flex: "0 0 20%",
        "@lg": {
          flex: "0 0 20%",
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
            peers={peers}
            maxColCount={1}
          />
        )}
      </Flex>
    </Flex>
  );
};




const FirstPersonDisplay = () => {
  return (
    <Box
      css={{
        position: "relative",
        overflow: "hidden",
        w: "20.5rem",
        maxWidth: "80%",
        h: "100%",
        r: "$3",
        m: "0 auto",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex
        align="center"
        direction="column"
        css={{
          position: "absolute",
          w: "100%",
          top: "33.33%",
          left: 0,
          textAlign: "center",
        }}
      >
        <Text variant="h4" css={{ "@md": { fontSize: "$md" } }}>
          Welcome!
        </Text>
        <Text variant="h6" css={{ mt: "$4", "@md": { fontSize: "$sm" } }}>
          You’re the first one here.
        </Text>
        <Text variant="h6" css={{ mt: "$2", "@md": { fontSize: "$sm" } }}>
          Sit back and relax till the others join.
        </Text>
      </Flex>
    </Box>
  );
};