import React from "react";
import {
  Flex,
  Text,
  textEllipsis,
  Box,
} from "@100mslive/react-ui";
import { SpeakerIcon } from "@100mslive/react-icons";
import {
  useHMSStore,
  selectDominantSpeaker,
  // selectLocalPeer,
} from "@100mslive/react-sdk";
import { ParticipantList } from "../roomcomp/ParticipantList";
import Invite from "./components/Invite";
import Gridchange from './components/Gridchange'
import Golive from './components/Golive'
// import { AdditionalRoomState } from "./AdditionalRoomState";

const SpeakerTag = () => {
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  return dominantSpeaker && dominantSpeaker.name ? (
    <Flex
      align="center"
      justify="center"
      css={{ flex: "1 1 0", color: "$textPrimary", "@md": { display: "none" } }}
    >
      <SpeakerIcon width={24} height={24} />
      <Text
        variant="md"
        css={{ ...textEllipsis(200), ml: "$2" }}
        title={dominantSpeaker.name}
      >
        {dominantSpeaker.name}
      </Text>
    </Flex>
  ) : (
    <></>
  );
};



export const ConferenceHeader = ({ isPreview }) => {
  // const localPeer = useHMSStore(selectLocalPeer);
  return (
    <Flex
      justify="between"
      align="center"
      css={{ position: "relative", height: "100%" }}
    >

      <SpeakerTag />
      <Flex align="center" css={{ position: "absolute", right: "$4" }}>
        <Flex align="center" css={{ mx: "9px" }}>
          <Gridchange/>
        </Flex>
        <Flex align="center" css={{ mx: "9px",display:"relative" }}>
          <Golive/>
        </Flex>
        <Flex align="center" css={{ mx: "9px" }}>
          <Invite/>
        </Flex>
        <Box css={{ mx: "9px" }}>
          <ParticipantList />
        </Box>
      </Flex>
    </Flex>
  );
};
