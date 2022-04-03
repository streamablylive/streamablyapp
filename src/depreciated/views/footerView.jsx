import {
  BrbIcon,
  ChatIcon,
  ChatUnreadIcon,
  HandIcon,
  // MusicIcon,
} from "@100mslive/react-icons";
import {
  // selectIsAllowedToPublisha,
  selectUnreadHMSMessagesCount,
  useHMSStore,
  // useScreenShare,
} from "@100mslive/react-sdk";
import {
  Flex,
  IconButton,
  Tooltip,
  VerticalDivider,
  Switch
} from "@100mslive/react-ui";
import {  useState } from "react";
import { AudioVideoToggle } from "./components/AudioVideoToggle";
import { LeaveRoom } from "./components/LeaveRoom";
import { NoiseSuppression } from "./components/NoiseSuppression";
import { useMyMetadata } from "./hooks/useMetadata";
import { MoreSettings } from "./components/MoreSettings";

import { Screenshare } from "./ScreenShare";
import Newwindows from "../components/Newwindow";



export const MetaActions = () => {
  const { isHandRaised, isBRBOn, toggleHandRaise, toggleBRB } = useMyMetadata();

  return (
    <Flex align="center">
      <Tooltip
        title={`${!isHandRaised ? "Raise" : "Unraise"} hand`}
        css={{ mx: "$4" }}
      >
        <IconButton onClick={toggleHandRaise} active={!isHandRaised}>
          <HandIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`${isBRBOn ? `I'm back` : `I'll be right back`}`}>
        <IconButton css={{ mx: "$4" }} onClick={toggleBRB} active={!isBRBOn}>
          <BrbIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

const Chat = ({ isChatOpen, toggleChat }) => {
  const countUnreadMessages = useHMSStore(selectUnreadHMSMessagesCount);

  return (
    <Tooltip key="chat" title={`${isChatOpen ? "Close" : "Open"} chat`}>
      <IconButton css={{ mx: "$4" }} onClick={toggleChat} active={!isChatOpen}>
        {countUnreadMessages === 0 ? <ChatIcon /> : <ChatUnreadIcon />}
      </IconButton>
    </Tooltip>
  );
};

export const ConferenceFooter = ({ isChatOpen, toggleChat }) => {
  const [w, setw] = useState(false)
  return (
    <Flex
      justify="between"
      align="center"
      css={{
        position: "relative",
        height: "100%",
        backgroundColor:"black",
        borderTopLeftRadius:"30px",
        borderTopRightRadius:"30px",
        "@md": { flexWrap: "wrap" },
      }}
    >
      <Flex
        align="center"
        css={{
          position: "absolute",
          left: "$7",
          "@md": {
            position: "unset",
            justifyContent: "center",
            w: "100%",
            p: "$4 0",
          },
        }}
      >
        <MetaActions />
        <Chat isChatOpen={isChatOpen} toggleChat={toggleChat}/>
        <Tooltip title="Streamers mode">
          <div className="flex flex-col items-center ml-2">
          <Switch checked={w} onClick={()=>setw(!w)} />
          </div>
        </Tooltip>
      </Flex>
      <Flex align="center" justify="center" css={{ w: "100%" }}>
        <AudioVideoToggle />
        <Screenshare css={{ mx: "$4" }} />
        <NoiseSuppression />
        <VerticalDivider space={4} />
        <MoreSettings />
        <Flex
          align="center"
          css={{ display: "none", "@md": { display: "flex", ml: "$4" } }}
        >
          <LeaveRoom />
        </Flex>
      </Flex>
      <Flex
        align="center"
        css={{
          position: "absolute",
          right: "18px",
          "@md": {
            display: "none",
          },
        }}
      >
        <LeaveRoom />
      </Flex>
      {w?<Newwindows s={setw}/>:null}
    </Flex>
  );
};
