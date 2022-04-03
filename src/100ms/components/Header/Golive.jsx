import React,{useState} from 'react'
import { POST } from '../../../apihelper/apihelper';
import { useIdentityContext } from 'react-netlify-identity';
import {toast} from 'react-toastify';
toast.configure()

const Golive = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div  onClick={()=>setOpen(true)}>
      {open ? <Content s={setOpen} />:
        <button className='btn h-10'>
          Go live
        </button>}
      </div>
    </React.Fragment>
  )
}

export default Golive



const Content = ({s}) => {
  const identity = useIdentityContext();
  const uid = identity.user.id;
  const [link, setlink] = useState('')
  const [, setloading] = useState(false)

  const handleSubmit = async (e) => {
    //e.preventDefault();
    if (e.keyCode === 13) {
      const body = { "url":link,"uid":uid };
      console.log(body);
      try {
          setloading(true);
          const {data:res} = await POST("golive",body);
          setloading(false);
          s(false)
          console.log(res);
      } catch (error) {
          console.error(error);
      }
    }
  };
  return (
    <input onKeyDown={(e) => handleSubmit(e) }  onChange={(e) => setlink(e.target.value)} value={link} type="text" placeholder="YT live url here " className="w-full h-10 pr-16 input input-primary input-bordered bg-[#212529] border-2 rounded-full text-white" /> 
  )
}
