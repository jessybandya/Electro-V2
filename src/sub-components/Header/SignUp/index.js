import React, {useState} from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify'
import { auth, db } from '../../../firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function SignUp({ handleClose }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if(!email){
        toast.error('Email input is empty!')
        setLoading(false)
    }else{
      db.collection("users").where("email","==",email).get().then((resultSnapShot) =>{
        if(resultSnapShot.size == 0){
          const config = {
            url: 'https://dotdelivery-fbd89.web.app/complete/registration',
            handleCodeInApp: true
        }
        auth.sendSignInLinkToEmail(email, config)
        toast.success(`A link has been sent to ${email} INBOX Or SPAM, click the link to complete your registration.`)
        window.localStorage.setItem('emailForRegistration', email)
        setEmail("")
        handleClose()
        setLoading(false)
        }else {
          //Already registered
          toast.warn("The email you enterd already in use")
          setLoading(false)
      }
      })

    }


    }

  return (
    <div>
                  <center style={{fontWeight:'bold'}}>Create An Account</center>
                  <br />
                  <div>
                  <TextField
          id="outlined-textarea"
          label="Enter your E-mail Address"
          type="email"
          fullWidth
          value={email} onChange={e => setEmail(e.target.value)}
          inputProps={{
            style: {
              height: "18px",
            },
          }}
        />
        <br /> <br/>
                  </div>
                  <center><Button onClick={handleSubmit} style={{backgroundColor:'#f5461b',color:'#fff',fontWeight:'bold',width:'100%',height:35}}>
                  {loading === true ?(
                      <span><CircularProgress style={{color:'#fff',alignItems:'center',height:14,width:14}}/><span style={{color:'#fff'}}>loading...</span></span>
                    ):(
                      <span>Submit</span>
                    )}
                    </Button></center>
          </div>
  )
}

export default SignUp