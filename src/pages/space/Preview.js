import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParam } from "react-use";
import { Loading, styled } from "@100mslive/react-ui";
import Preview from "../../100ms/components/Preview";
import { ErrorDialog } from "../../100ms/primitives/DialogContent";
import { AppContext } from "../../100ms/components/context/AppContext";
import { SKIP_PREVIEW } from "../../100ms/common/constants";
import getToken from "../../services/tokenService";
import { useIdentityContext } from "react-netlify-identity";

const env = process.env.REACT_APP_ENV;
// use this field to join directly for quick testing while in local
const directJoinNoHeadless = process.env.REACT_APP_HEADLESS_JOIN === "true";
const PreviewS = ({ getUserToken }) => {
  const navigate = useNavigate();
  const identity = useIdentityContext();
  const uid = identity.user.id;
  const utoken = identity.user.token.access_token;
  const { tokenEndpoint, setIsHeadless, loginInfo, setLoginInfo } =
    useContext(AppContext);
  const { roomId: urlRoomId, role: userRole } = loginInfo; // from the url
  const [token, setToken] = useState(null);
  const [error, setError] = useState({ title: "", body: "" });
  // skip preview for beam recording and streaming
  const beamInToken = useSearchParam("token") === "beam_recording"; // old format to remove
  let skipPreview = useSearchParam(SKIP_PREVIEW) === "true";
  skipPreview = skipPreview || beamInToken || directJoinNoHeadless;

  useEffect(() => {
    if (!urlRoomId) {
      navigate("/r");
    }
    const getTokenFn = () => getToken(utoken, uid, userRole, urlRoomId);
    getTokenFn()
      .then(token => {
        setToken(token);
        setLoginInfo({ token: token });
      })
      .catch(error => {
        setError(convertPreviewError(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenEndpoint, urlRoomId, userRole, utoken, uid]);

  const onJoin = () => {
    !directJoinNoHeadless && setIsHeadless(skipPreview);
    navigate("/r/room");
  };

  if (error.title) {
    return <ErrorDialog title={error.title}>{error.body}</ErrorDialog>;
  }
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4">
      {token ? (
        <>
          <Preview
            initialName={skipPreview ? "Beam" : ""}
            skipPreview={skipPreview}
            env={env}
            onJoin={onJoin}
            token={token}
          />
        </>
      ) : (
        <Loading size={100} />
      )}
    </div>
  );
};

const convertPreviewError = error => {
  console.error("[error]", { error });
  if (error.response && error.response.status === 404) {
    return {
      title: "Room does not exist",
      body: ErrorWithSupportLink(
        "We could not find a room corresponding to this link."
      ),
    };
  } else if (error.response && error.response.status === 403) {
    return {
      title: "Accessing room using this link format is disabled",
      body: ErrorWithSupportLink(
        "You can re-enable this from the developer section in Dashboard."
      ),
    };
  } else {
    console.error("Token API Error", error);
    return {
      title: "Error fetching token",
      body: ErrorWithSupportLink(
        "An error occurred while fetching the app token. Please look into logs for more details."
      ),
    };
  }
};

const Link = styled("a", {
  color: "#2f80e1",
});

const ErrorWithSupportLink = errorMessage => (
  <div>
    {errorMessage} If you think this is a mistake on our side, please create{" "}
    <Link
      target="_blank"
      href="https://github.com/100mslive/100ms-web/issues"
      rel="noreferrer"
    >
      an issue
    </Link>{" "}
    or reach out over{" "}
    <Link
      target="_blank"
      href="https://discord.com/invite/kGdmszyzq2"
      rel="noreferrer"
    >
      Discord
    </Link>
    .
  </div>
);

export default PreviewS;
