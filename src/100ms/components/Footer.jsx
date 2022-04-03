import { Fragment, useState } from "react";
import {
  BrbIcon,
  ChatIcon,
  ChatUnreadIcon,
  HandIcon,
  MusicIcon,
} from "@100mslive/react-icons";
import {
  HMSPlaylistType,
  selectUnreadHMSMessagesCount,
  selectIsAllowedToPublish,
  useHMSStore,
  useScreenShare,
} from "@100mslive/react-sdk";
import {
  Flex,
  IconButton,
  Tooltip,
  VerticalDivider,
  Switch
} from "@100mslive/react-ui";
import { AudioVideoToggle } from "./AudioVideoToggle";
import { LeaveRoom } from "./LeaveRoom";
import { MoreSettings } from "./MoreSettings/MoreSettings";
import { Screenshare } from "./ScreenShare";
import { ScreenShareHintModal } from "./ScreenshareHintModal";
import { NoiseSuppression } from "../plugins/NoiseSuppression";
import { ToggleWhiteboard } from "../plugins/whiteboard";
import { VirtualBackground } from "../plugins/VirtualBackground";
import { useMyMetadata } from "./hooks/useMetadata";
import { FeatureFlags } from "../../services/FeatureFlags";
import { isScreenshareSupported } from "../../common/utils";
import { Playlist } from "../components/Playlist/Playlist";
import { TranscriptionButton } from "../plugins/transcription";
import Newwindows from "../../components/Newwindow";

const ScreenshareAudio = () => {
  const {
    amIScreenSharing,
    screenShareVideoTrackId: video,
    screenShareAudioTrackId: audio,
    toggleScreenShare,
  } = useScreenShare();
  const isAllowedToPublish = useHMSStore(selectIsAllowedToPublish);
  const isAudioScreenshare = amIScreenSharing && !video && !!audio;
  const [showModal, setShowModal] = useState(false);
  if (!isAllowedToPublish.screen || !isScreenshareSupported()) {
    return null;
  }
  return (
    <Fragment>
      <Tooltip
        title={`${!isAudioScreenshare ? "Start" : "Stop"} audio sharing`}
        key="shareAudio"
      >
        <IconButton
          active={!isAudioScreenshare}
          css={{ mr: "$4" }}
          onClick={() => {
            if (amIScreenSharing) {
              toggleScreenShare(true);
            } else {
              setShowModal(true);
            }
          }}
          data-testid="screenshare_audio"
        >
          <MusicIcon />
        </IconButton>
      </Tooltip>
      {showModal && (
        <ScreenShareHintModal onClose={() => setShowModal(false)} />
      )}
    </Fragment>
  );
};

export const MetaActions = () => {
  const { isHandRaised, isBRBOn, toggleHandRaise, toggleBRB } = useMyMetadata();

  return (
    <Flex align="center">
      <Tooltip
        title={`${!isHandRaised ? "Raise" : "Unraise"} hand`}
        css={{ mx: "$4" }}
      >
        <IconButton
          onClick={toggleHandRaise}
          active={!isHandRaised}
          data-testid="raise_hand_btn"
        >
          <HandIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`${isBRBOn ? `I'm back` : `I'll be right back`}`}>
        <IconButton
          css={{ mx: "$4" }}
          onClick={toggleBRB}
          active={!isBRBOn}
          data-testid="brb_btn"
        >
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
      <IconButton
        css={{ mx: "$4" }}
        onClick={toggleChat}
        active={!isChatOpen}
        data-testid="chat_btn"
      >
        {countUnreadMessages === 0 ? (
          <ChatIcon />
        ) : (
          <ChatUnreadIcon data-testid="chat_unread_btn" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export const Footer = ({ isChatOpen, toggleChat }) => {
  const [w, setw] = useState(false)
  return (
    <Flex
      justify="between"
      align="center"
      css={{
        padding: "$2",
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
        <ScreenshareAudio />
        <Playlist type={HMSPlaylistType.audio} />
        <Playlist type={HMSPlaylistType.video} />
        {FeatureFlags.enableWhiteboard ? <ToggleWhiteboard /> : null}
        <LeftDivider />
        <VirtualBackground />
        <NoiseSuppression />
        <Tooltip title="Streamers mode">
          <div className="flex flex-col items-center ml-2">
            <Switch checked={w} onClick={()=>setw(!w)} />
          </div>
        </Tooltip>
        {FeatureFlags.enableTranscription && <TranscriptionButton />}
        <Flex
          align="center"
          css={{
            display: "none",
            "@md": {
              display: "flex",
            },
          }}
        >
          <VerticalDivider space={4} />
          <MetaActions />
        </Flex>
      </Flex>
      <Flex align="center" justify="center" css={{ w: "100%" }}>
        <AudioVideoToggle />
        <Screenshare css={{ mx: "$4" }} />
        <MoreSettings />
        <VerticalDivider space={4} />
        <LeaveRoom />
        <Flex
          align="center"
          css={{ display: "none", "@md": { display: "flex", ml: "$4" } }}
        >
          <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} />
        </Flex>
      </Flex>
      <Flex
        align="center"
        css={{
          position: "absolute",
          right: "$7",
          "@md": {
            display: "none",
          },
        }}
      >
        <MetaActions />
        <VerticalDivider space={4} />
        <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} />
      </Flex>
      {w?<Newwindows s={setw}/>:null}
    </Flex>
  );
};

const LeftDivider = () => {
  const allowedToPublish = useHMSStore(selectIsAllowedToPublish);
  return (
    <>
      {allowedToPublish.screen || FeatureFlags.enableWhiteboard ? (
        <VerticalDivider space={4} />
      ) : null}
    </>
  );
};
