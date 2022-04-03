import React from 'react'
import  { mutate } from 'swr'
// import { POST } from '../../apihelper/apihelper'
// import { AppContext } from '../../100ms/components/context/AppContext'

const Ytlive = () => {
  // const {loginInfo}=useContext(AppContext)  
  // const post=async()=>{
  //   const b = (await POST("getyturl",{"uid":loginInfo.huid })).data
  //   console.log(b)
  //   return b
  // }
  
  const {data} = {data:"Y1XKe0vuWfw"}
  // const {data} = useSWR("/.netlify/functions/getyturl", ()=>post(),{refreshInterval :10000,revalidateIfStale: false,revalidateOnFocus: false,});
  return (
    <div className='w-full h-full flex-grow'>
      {data==="not live"?<Reload/>: <iframe allowfullscreen="false" title='ytlive'
      frameborder="0" 
      src={`https://www.youtube.com/live_chat?v=${data}&embed_domain=localhost`}
      width="100%" 
      height='100%'
      />}
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


export default Ytlive