import React, { useState } from 'react'
import { ChatView } from './chatView'
import Ytlive from './Ytlive'
const Right = ({toggleChat,isChatOpen}) => {
  const [tab, settab] = useState(1) 
 
  return (
    <div  className={'w-[310px] h-full  py-4 flex flex-col '+(isChatOpen?"block":"hidden")}>
      <div className=' w-full h-full flex flex-col items-center bg-black rounded-l-xl  py-2'>
        <div className='w-[90%] flex  items-center  h-[13%] '>
          <div className='w-full h-12  flex items-center bg-gray2 rounded-xl  '>
            <div onClick={()=>settab(1)} className={'w-1/2 hover:cursor-pointer text-xl text-white text-center '+(tab===1?"bg-primary rounded-xl py-2.5 h-[110%] ":"py-2 rounded-l-xl ")}>
              Room Chat
            </div>
            <div onClick={()=>settab(2)} className={'w-1/2 hover:cursor-pointer text-xl text-white text-center '+(tab===2?"bg-primary rounded-xl py-2.5 h-[110%] ":"py-2 rounded-r-xl ")}>
              YT Chat
            </div>
          </div>
        </div>
        <div className=' flex w-full h-[87%]  flex-col items-center py-3'>
          {tab===1?
            <ChatView  toggleChat={toggleChat} />:
            <Ytlive/>}
        </div>
      </div>
    </div>
  )
}

export default Right