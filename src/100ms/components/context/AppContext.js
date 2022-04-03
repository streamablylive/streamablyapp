import React, { useState, useEffect, useMemo } from "react";
import {
  useHMSStore,
  selectLocalPeer,
  selectAvailableRoleNames,
  selectRolesMap,
} from "@100mslive/react-sdk";
import { FeatureFlagsInit } from "./FeatureFlags";
import { normalizeAppPolicyConfig } from "./appContextUtils";
import {
  UserPreferencesKeys,
  useUserPreferences,
} from "../hooks/useUserPreferences";
import {
  DEFAULT_HLS_ROLE_KEY,
  DEFAULT_HLS_VIEWER_ROLE,
} from "../../../common/constants";
import { getMetadata } from "../../../common/utils";

const AppContext = React.createContext(null);

const defaultTokenEndpoint =
  "https://prod-in.100ms.live/hmsapi/streamit.app.100ms.live/";

const envPolicyConfig = JSON.parse(process.env.REACT_APP_POLICY_CONFIG || "{}");
const envAudioPlaylist = JSON.parse(
  process.env.REACT_APP_AUDIO_PLAYLIST || "[]"
);
const envVideoPlaylist = JSON.parse(
  process.env.REACT_APP_VIDEO_PLAYLIST || "[]"
);

const defaultUiSettings = {
  maxTileCount: 9,
  subscribedNotifications: {
    PEER_JOINED: false,
    PEER_LEFT: false,
    NEW_MESSAGE: false,
    ERROR: true,
    METADATA_UPDATED: true,
  },
  uiViewMode: "grid",
  showStatsOnTiles: false,
  enableAmbientMusic: false,
};

const initialLoginInfo = {
  token: null,
  username: "",
  role: "",
  roomId: "",
  huid: "",
  env: "prod-in",
  audioMuted: false,
  videoMuted: false,
  selectedVideoInput: "default",
  selectedAudioInput: "default",
  selectedAudioOutput: "default",
  isHeadlessMode: false,
};

const AppContextProvider = ({
  tokenEndpoint = defaultTokenEndpoint,
  policyConfig = envPolicyConfig,
  audioPlaylist = envAudioPlaylist,
  videoPlaylist = envVideoPlaylist,
  children,
  appDetails,
  logo,
}) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const roleNames = useHMSStore(selectAvailableRoleNames);
  const rolesMap = useHMSStore(selectRolesMap);
  const appPolicyConfig = useMemo(
    () => normalizeAppPolicyConfig(roleNames, rolesMap, policyConfig),
    [roleNames, policyConfig, rolesMap]
  );
  const [uiSettings, setUISettings] = useUserPreferences(
    UserPreferencesKeys.UI_SETTINGS,
    defaultUiSettings
  );

  const [state, setState] = useState({
    loginInfo: initialLoginInfo,
    isHeadless: false,
    isAudioOnly: false,
    maxTileCount: uiSettings.maxTileCount,
    localAppPolicyConfig: {},
    subscribedNotifications: uiSettings.subscribedNotifications || {},
    uiViewMode: uiSettings.uiViewMode || "grid",
    showStatsOnTiles: uiSettings.showStatsOnTiles || false,
    enableAmbientMusic: uiSettings.enableAmbientMusic || false,
  });

  useEffect(() => {
    setUISettings({
      maxTileCount: state.maxTileCount,
      subscribedNotifications: state.subscribedNotifications,
      uiViewMode: state.uiViewMode,
      showStatsOnTiles: state.showStatsOnTiles,
      enableAmbientMusic: state.enableAmbientMusic,
    });
    if (state.loginInfo.username) {
      localStorage.setItem("name", state.loginInfo.username);
    }
  }, [
    state.loginInfo.username,
    state.maxTileCount,
    state.subscribedNotifications,
    state.uiViewMode,
    state.showStatsOnTiles,
    state.enableAmbientMusic,
    setUISettings,
  ]);

  useEffect(() => {
    function resetHeight() {
      // reset the body height to that of the inner browser
      document.body.style.height = `${window.innerHeight}px`;
    }
    // reset the height whenever the window's resized
    window.addEventListener("resize", resetHeight);
    // called to initially set the height.
    resetHeight();
    return () => {
      window.removeEventListener("resize", resetHeight);
    };
  }, []);

  useEffect(() => {
    localPeer && deepSetAppPolicyConfig(appPolicyConfig[localPeer.roleName]);
  }, [localPeer, localPeer?.roleName, appPolicyConfig]);

  const deepSetMaxTiles = maxTiles =>
    setState(prevState => ({ ...prevState, maxTileCount: maxTiles }));

  const deepSetAppPolicyConfig = config =>
    setState(prevState => ({ ...prevState, localAppPolicyConfig: config }));

  const deepSetSubscribedNotifications = notification =>
    setState(prevState => ({
      ...prevState,
      subscribedNotifications: {
        ...prevState.subscribedNotifications,
        [notification.type]: notification.isSubscribed,
      },
    }));

  const deepSetuiViewMode = layout =>
    setState(prevState => ({ ...prevState, uiViewMode: layout }));

  const deepSetShowStatsOnTiles = show =>
    setState(prevState => ({ ...prevState, showStatsOnTiles: show }));

  const deepSetEnableAmbientMusic = enable =>
    setState(prevState => ({ ...prevState, enableAmbientMusic: enable }));

  const deepSetIsHeadLess = isHeadless =>
    setState(prevState => ({ ...prevState, isHeadless: isHeadless }));

  const deepSetLoginInfo = loginInfo => {
    const newState = {
      ...state,
      loginInfo: { ...state.loginInfo, ...loginInfo },
    };
    setState(newState);
    console.log(newState); // note: component won't reflect changes at time of this log
  };

  const deepSetIsAudioOnly = value => {
    setState(prevState => ({
      ...prevState,
      isAudioOnly: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        setLoginInfo: deepSetLoginInfo,
        loginInfo: state.loginInfo,
        setMaxTileCount: deepSetMaxTiles,
        setSubscribedNotifications: deepSetSubscribedNotifications,
        setuiViewMode: deepSetuiViewMode,
        setShowStatsOnTiles: deepSetShowStatsOnTiles,
        setEnableAmbientMusic: deepSetEnableAmbientMusic,
        enableAmbientMusic: state.enableAmbientMusic,
        showStatsOnTiles: state.showStatsOnTiles,
        uiViewMode: state.uiViewMode,
        maxTileCount: state.maxTileCount,
        subscribedNotifications: state.subscribedNotifications,
        appPolicyConfig: state.localAppPolicyConfig,
        VIEWER_ROLE:
          getMetadata(appDetails)[DEFAULT_HLS_ROLE_KEY] ||
          DEFAULT_HLS_VIEWER_ROLE,
        tokenEndpoint,
        audioPlaylist,
        videoPlaylist,
        logo,
        isHeadless: state.isHeadless,
        setIsHeadless: deepSetIsHeadLess,
        isAudioOnly: state.isAudioOnly,
        setIsAudioOnly: deepSetIsAudioOnly,
      }}
    >
      {children}
      <FeatureFlagsInit />
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
