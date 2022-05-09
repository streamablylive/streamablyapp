import React from "react";
import errorBgDark from "../images/error-bg-dark.svg";
import { Text } from "@100mslive/react-ui";

function ErrorPage({ error }) {
  return (
    <div className="flex justify-center items-center w-full h-full bg-primary text-primary">
      <div className="relative overflow-hidden right-3">
        <img
          src={errorBgDark }
          alt="error background"
        />
        <div className="flex items-center flex-col  absolute h-full w-full top-[33.33%] left-0">
          <Text variant="h2">404</Text>
          <Text variant="h4" css={{ mt: "1.75rem" }}>
            {error}
          </Text>
        </div>
      </div>
    </div>
  );
}

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
