//                                                            ॐ नमः शिवाय
import React, { useEffect, useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./Bg";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import PreviewS from "./pages/space/Preview";
import Conference from "./pages/space/Conference";
import Noid from "./components/Noid";
import { AppContextProvider } from "./100ms/components/context/AppContext";
import { Notifications } from "./100ms/components/Notifications";
import { Confetti } from "./100ms/plugins/confetti";
import ToastContainer from "./100ms/components/Toast/ToastContainer";
import { shadeColor } from "./100ms/common/utils";
import { FeatureFlags } from "./services/FeatureFlags";
// import { KeyboardHandler } from "./100ms/components/Input/KeyboardInputManager";

import { HMSRoomProvider } from "@100mslive/react-sdk";
import {
  IdentityContextProvider,
  useIdentityContext,
} from "react-netlify-identity";
import { HMSThemeProvider, Box } from "@100mslive/react-ui";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const defaultTokenEndpoint =
  "https://prod-in.100ms.live/hmsapi/streamit.app.100ms.live/";

const App = () => {
  const url = "https://streamably.netlify.app";

  return (
    <IdentityContextProvider url={url}>
      <AuthStatusView
        themeConfig={{
          aspectRatio: process.env.REACT_APP_TILE_SHAPE,
          theme: process.env.REACT_APP_THEME,
          color: process.env.REACT_APP_COLOR,
          logo: process.env.REACT_APP_LOGO,
          font: process.env.REACT_APP_FONT,
          showChat: process.env.REACT_APP_SHOW_CHAT,
          showScreenshare: process.env.REACT_APP_SHOW_SCREENSHARE,
          showAvatar: process.env.REACT_APP_VIDEO_AVATAR,
          avatarType: process.env.REACT_APP_AVATAR_TYPE,
          logoClass: process.env.REACT_APP_LOGO_CLASS,
          headerPresent: process.env.REACT_APP_HEADER_PRESENT,
          metadata: process.env.REACT_APP_DEFAULT_APP_DETAILS, // A stringified object in env
        }}
        getUserToken={defaultTokenEndpoint}
      />
    </IdentityContextProvider>
  );
};
export default App;

const envPolicyConfig = JSON.parse(process.env.REACT_APP_POLICY_CONFIG || "{}");

export function AuthStatusView({
  roomId = "",
  tokenEndpoint = defaultTokenEndpoint,
  themeConfig: {
    aspectRatio = "1-1",
    font = "Roboto",
    color = "#2F80FF",
    theme = "dark",
    logo = "",
    headerPresent = "false",
    metadata = "",
  },
  getUserToken = defaultTokenEndpoint,
  policyConfig = envPolicyConfig,
}) {
  const { 0: width, 1: height } = aspectRatio
    .split("-")
    .map(el => parseInt(el));
  const [themeType, setThemeType] = useState(theme);
  const { getFreshJWT } = useIdentityContext();
  useEffect(() => {
    window.toggleUiTheme = () => {
      setThemeType(themeType === "dark" ? "light" : "dark");
    };
  }, [themeType]);
  useEffect(() => {
    const jwtr = async () => {
      await getFreshJWT();
    };
    jwtr();

    setThemeType(theme);
  }, [theme, getFreshJWT]);
  return (
    <HMSThemeProvider
      themeType={themeType}
      aspectRatio={{ width, height }}
      theme={{
        colors: {
          brandDefault: color,
          brandDark: shadeColor(color, -30),
          brandLight: shadeColor(color, 30),
          brandDisabled: shadeColor(color, 10),
        },
        fonts: {
          sans: [font, "Inter", "sans-serif"],
        },
      }}
    >
      <HMSRoomProvider isHMSStatsOn={FeatureFlags.enableStatsForNerds}>
        <AppContextProvider
          roomId={roomId}
          tokenEndpoint={tokenEndpoint}
          policyConfig={policyConfig}
          appDetails={metadata}
          logo={logo}
        >
          <Box
            css={{
              bg: "$mainBg",
              w: "100%",
              ...(headerPresent === "true" ? { flex: "1 1 0" } : { h: "100%" }),
            }}
          >
            <AppRoutes />
          </Box>
        </AppContextProvider>
      </HMSRoomProvider>
    </HMSThemeProvider>
  );
}

function AppRoutes() {
  return (
    <Router>
      <ToastContainer />
      <Notifications />
      <Confetti />
      {/* <KeyboardHandler /> */}
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/f" element={<Friends />} />
          <Route exact path="/r/preview" element={<PreviewS />} />
          <Route exact path="/r/room" element={<Conference />} />
          <Route exact path="/r" element={<Noid />} />
          <Route exact path="/s" element={<Settings />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
