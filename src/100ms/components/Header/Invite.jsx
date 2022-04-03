import React,{useState} from 'react'
import {
  Dropdown,
  Flex,
  Box,
} from "@100mslive/react-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon
} from "@100mslive/react-icons";
import { POST } from '../../../apihelper/apihelper';
import { useIdentityContext } from 'react-netlify-identity';
import {toast} from 'react-toastify';
toast.configure()

const Invite = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Dropdown.Root open={open} onOpenChange={value => setOpen(value)}>
        <Dropdown.Trigger asChild>
          <Flex
            css={{
              color: "$textPrimary",
              borderRadius: "$1",
              border: "1px solid $textDisabled",
            }}
          >
              <Flex>
                Invite
                <Box
                  css={{
                    ml: "$2",
                    "@lg": { display: "none" },
                    color: "$textDisabled",
                  }}
                >
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Box>
              </Flex>
          </Flex>
        </Dropdown.Trigger>
        <Dropdown.Content
          sideOffset={5}
          align="end"
          css={{ height: "auto", maxHeight: "$96",padding:0 ,backgroundColor:"#353C42" }}
        >
          <Content/>
        </Dropdown.Content>
      </Dropdown.Root>
    </React.Fragment>
  )
}

export default Invite



const Content = () => {
  const identity = useIdentityContext();
  const uid = identity.user.id;

  const [tokenno, settokenno] = useState(1)
  const [loading, setloading] = useState(false)
  const resetForm = () => {
      settokenno(1);
  };
  const Toast =(data)=>{
    toast(data,{position: toast.POSITION.BOTTOM_RIGHT,autoClose:2000,hideProgressBar:true,theme:"dark"})
  }
  const handleSubmit = async () => {
    //e.preventDefault();
    const body = { "tvn":tokenno,"uid":uid };
    console.log(body);
    try {
        setloading(true);
        const {data:res} = await POST("gentokenroomid",body);
        setloading(false);
        resetForm();
        navigator.clipboard.writeText(res)
        console.log(res);
        Toast("code generated and copied!")
    } catch (error) {
        console.error(error);
    }
    
};
  return (
    // <div className=' bg-gradient-to-br from-primary via-transparent to-primary rounded-lg p-0.5 '>
      <div className='bg-custom-gray rounded-lg flex flex-col items-center'>
        <div className='text-white my-2'>Create a quick Invite token</div>
        <div className=" flex">
            <input onChange={(e) => settokenno(e.target.value)} type="range" min='1' max="10" value={tokenno} className='range range-primary w-32' /> 
            <p className='ml-1 w-3 text-white'>{tokenno}</p>
        </div>
        
        <button className="btn w-40 text-sm mt-3 mb-3 btn-primary btn-outline  p-0 " onClick={loading?null:handleSubmit} >
        {loading ?
        <svg  height="80%" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stopColor="#fff" sstopOpacity="0" offset="0%"/>
                    <stop stopColor="#fff" sstopOpacity=".631" offset="63.146%"/>
                    <stop stopColor="#fff" offset="100%"/>
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </path>
                    <circle fill="#fff" cx="36" cy="18" r="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>
        </svg>:
        <p>Generate and Copy</p>
        }

        </button> 
      </div>
    // </div>
  )
}
