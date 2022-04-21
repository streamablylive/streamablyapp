import { selectPeersByRole, useHMSStore } from '@100mslive/react-sdk'
import React, { useEffect } from 'react'
import  { mutate } from 'swr'
import { useMyMetadata } from './hooks/useMetadata'

const Ytlivec = () => {
  const {peerMetaData}=useMyMetadata()
  const peer =useHMSStore(selectPeersByRole("host"))[0]
  const link = peerMetaData(peer.id)?.isLive===false? 'Y1XKe0vuWfw':peerMetaData(peer.id)?.isLive
  useEffect(()=>{
    console.log(peer)
  },[])
  
  return (
    <div className='w-full h-full flex-grow'>
      <iframe allowfullscreen="false" title='ytlive'
      frameborder="0" 
      src={`https://www.youtube.com/live_chat?v=${link}&embed_domain=${window.location.hostname}`}
      width="100%" 
      height='100%'
      />
    </div>
  )
}

export const Reload = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <button className='btn' onClick={()=>mutate("/.netlify/functions/getyturl")}>
        retry
      </button>
    </div>
  )
}

const Ytlive = React.memo(Ytlivec);

export default Ytlive