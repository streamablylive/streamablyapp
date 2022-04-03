import React,{useCallback} from 'react'
import { useCustomEvent, useHMSActions } from '@100mslive/react-sdk';
import {  IconButton } from "@100mslive/react-ui";
import { SendIcon,TextboxIcon } from "@100mslive/react-icons";

const SecretMsg = () => {
  const actions = useHMSActions();

  const onEvent = useCallback((msg) => {
    console.log(msg); 
  }, []);

  const { sendEvent } = useCustomEvent({
    type: 'EMOJI_REACTION',
    onEvent,
  });

  return (

    <IconButton
    onClick={() => sendEvent({emoji: "🚀"})}
        css={{ ml: "auto", height: "max-content", mr: "$4" }}
      >
        <TextboxIcon />
      </IconButton>
  )
}

export default SecretMsg