import React, { useState } from "react";
import {
  usePreviewJoin,
  selectLocalPeer,
  useHMSStore,
  selectIsLocalVideoEnabled,
  useAVToggle,
} from "@100mslive/react-sdk";

import {
  Loading,
  Button,
  StyledVideoTile,
  Video,
  Text,
  Input,
  Avatar,
  IconButton,
  // styled,
} from "@100mslive/react-ui";
import { AudioVideoToggle } from "../views/components/AudioVideoToggle";
import { SettingIcon } from "@100mslive/react-icons";
import Settings from "./Settings";
import {
  UserPreferencesKeys,
  useUserPreferences,
} from "../views/hooks/useUserPreferences";
import { useVideoList } from "@100mslive/react-sdk";

const defaultPreviewPreference = {
  name: "",
  isAudioMuted: false,
  isVideoMuted: false,
};

const Preview = ({ token, onJoin, env, skipPreview, initialName }) => {
  const [previewPreference, setPreviewPreference] = useUserPreferences(
    UserPreferencesKeys.PREVIEW,
    defaultPreviewPreference
  );
  const [name, setName] = useState(initialName || previewPreference.name);
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  const { enableJoin, preview, join } = usePreviewJoin({
    name,
    token,
    initEndpoint: env ? `https://${env}-init.100ms.live/init` : undefined,
    initialSettings: {
      isAudioMuted: skipPreview ? true : previewPreference.isAudioMuted,
      isVideoMuted: skipPreview ? true : previewPreference.isVideoMuted,
    },
  });
  React.useEffect(() => {
    console.log( ref, pagesWithTiles)
    if (token) {
      if (skipPreview) {
        savePreferenceAndJoin();
      } else {
        preview();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const savePreferenceAndJoin = React.useCallback(() => {
    setPreviewPreference({
      name,
      isAudioMuted: !isLocalAudioEnabled,
      isVideoMuted: !isLocalVideoEnabled,
    });
    join();
    onJoin && onJoin();
  }, [
    join,
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    name,
    setPreviewPreference,
    onJoin,
  ]);
  const localPeer = useHMSStore(selectLocalPeer);
  const { ref, pagesWithTiles } = useVideoList({
    peers:localPeer,
    maxTileCount:2,
    maxColCount:2,
    maxRowCount:2,
    includeScreenShareForPeer:false,
    aspectRatio:1,
    offsetY: 32,
  });
  
  return (
    <div className="h-full w-full flex items-center justify-around ">
      <PreviewTile name={name} />
      <div className="flex flex-col items-center ">
        <Text css={{ my: "1rem" }} variant="h4">
          Hi There!
        </Text>
        <Text css={{ mb: "1rem" }}>What's your name?</Text>
        <form
          className="flex flex-col items-center"
          onSubmit={e => {
            e.preventDefault();
            savePreferenceAndJoin();
          }}
        >
          <Input
            css={{ mb: "1rem" }}
            autoComplete="name"
            type="text"
            required
            autoFocus
            maxLength={20}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button type="submit" disabled={!name || !enableJoin}>
            Join
          </Button>
        </form>
      </div>
    </div>
  );
};

const PreviewTile = ({ name }) => {
  const localPeer = useHMSStore(selectLocalPeer);
  // const borderAudioRef = useBorderAudioLevel(localPeer?.audioTrack);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);
  return (
    <StyledVideoTile.Container
      css={{
        aspectRatio: 16/9,
        width: "unset",
        height: "min(360px, 60vh)",
        "@sm": {
          height: "unset",
          width: "min(360px, 90%)",
        },
      }}
      // ref={borderAudioRef}
    >
      {localPeer ? ( 
        <>
        {/* error is over here */}
          <Video mirror={true} trackId={localPeer.videoTrack} />
        {/* error is over here */}
          {!isVideoOn ? <Avatar name={name} /> : null}
          <StyledVideoTile.AttributeBox css={controlStyles}>
            <AudioVideoToggle compact />
          </StyledVideoTile.AttributeBox>
          <Settings>
            <StyledVideoTile.AttributeBox css={settingStyles}>
              <IconButton>
                <SettingIcon />
              </IconButton>
            </StyledVideoTile.AttributeBox>
          </Settings>
        </>
      ) : (
        <Loading size={100} />
      )}
    </StyledVideoTile.Container>
  );
};



const controlStyles = {
  bottom: "10px",
  left: "50%",
  transform: "translate(-50%, 0)",
  display: "flex",
  "& > * + *": {
    marginRight: "0",
    marginLeft: "0.5rem",
  },
};

const settingStyles = {
  bottom: "10px",
  right: "20px",
};

export default Preview;