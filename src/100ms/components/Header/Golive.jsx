import React,{useState} from 'react'
import { POST } from '../../../apihelper/apihelper';
import { useIdentityContext } from 'react-netlify-identity';
import {useMyMetadata} from '../hooks/useMetadata'
import {selectLocalPeerRole, useHMSStore} from "@100mslive/react-sdk"
import {toast} from 'react-toastify';
toast.configure()

const Golive = () => {
  const [open, setOpen] = useState(false);
  const isPeerHost = useHMSStore(selectLocalPeerRole).name==="host"
  if (isPeerHost) {
    return (
      <React.Fragment>
        <div  onClick={()=>setOpen(true)}>
        {open ? <Content s={setOpen} />:
          <button className='btn btn-xs h-10'>
            Go live
          </button>}
        </div>
      </React.Fragment>
    )
  }
  return null
}

export default Golive



const Content = ({s}) => {
  const {toggleLive}=useMyMetadata()
  const identity = useIdentityContext();
  const uid = identity.user.id;
  const [link, setlink] = useState('')
  const [, setloading] = useState(false)
  const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  

  const handleSubmit = async (e) => {
    //e.preventDefault();
    if (e.keyCode === 13) {
      const body = { "url":link,"uid":uid };
      const match = link.match(regExp);
      const code= (match && match[1].length==11)? match[1] : false;
      console.log(body);
      try {
          setloading(true);
          const {data:res} = await POST("golive",body);
          toggleLive(code)
          setloading(false);
          s(false)
          console.log(res); 
      } catch (error) {
          console.error(error);
      }
    }
  };
  return (
    <input onKeyDown={(e) => handleSubmit(e) }  onChange={(e) => setlink(e.target.value)} value={link} type="text" placeholder="YT live url here " className="w-32 h-10  input input-primary input-bordered bg-[#212529] border-2 rounded-full text-white" /> 
  )
}
