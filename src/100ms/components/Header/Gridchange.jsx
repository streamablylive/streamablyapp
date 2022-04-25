import React,{useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { IconButton } from '@100mslive/react-ui';
import { BsFillGrid3X2GapFill,BsFillGrid1X2Fill } from "react-icons/bs";
import {HiViewGrid} from 'react-icons/hi'
const Gridchange = () => {
  const {
    uiViewMode,
    setuiViewMode
  } = useContext(AppContext);
  return (
    <div className='flex justify-around gap-x-2 mx-4'>
      <IconButton
        active={uiViewMode !== "gallery"}
        onClick={()=> setuiViewMode("gallery")}
        shape="circle"
        data-testid="audio_btn"
      >
        <BsFillGrid3X2GapFill/>
      </IconButton>
      <IconButton
        active={uiViewMode !== "activeSpeaker"}
        onClick={()=> setuiViewMode("activeSpeaker")}
        shape="circle"
        data-testid="audio_btn"
      >
        <BsFillGrid1X2Fill/>
      </IconButton>
      <IconButton
        active={uiViewMode !== "grid"}
        onClick={()=> setuiViewMode("grid")}
        shape="circle"
        data-testid="audio_btn"
      >
        <HiViewGrid/>
      </IconButton>
    </div>
  )
}

export default Gridchange