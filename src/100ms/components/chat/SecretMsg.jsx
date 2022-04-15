import React,{useCallback} from 'react'
import { useCustomEvent } from '@100mslive/react-sdk';
import {  IconButton } from "@100mslive/react-ui";
import { TextboxIcon } from "@100mslive/react-icons";

const SecretMsg = ({}) => {

  const onEvent = useCallback((msg) => {
    
  }, []);

  const { sendEvent } = useCustomEvent({
    type: 'SECRET',
    onEvent,
  });

  return (

    <IconButton
    onClick={() => sendEvent({msg:""})}
        css={{ ml: "auto", height: "max-content", mr: "$4" }}
      >
        <TextboxIcon />
      </IconButton>
  )
}

export default SecretMsg