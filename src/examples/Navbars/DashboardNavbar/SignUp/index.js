import React, { useState } from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftInput from '../../../../components/SoftInput'
import SoftTypography from '../../../../components/SoftTypography'
import brand from "../../../../assets/images/logo-ct.png";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import { auth, db } from '../../../../firebase'
import logo from '../../../../logo.svg';


function SignUp({setModalShow}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);

  const signUp = (e) => {
    e.preventDefault()
    setLoading(true)
    if(!email){
        toast.error('Email input is empty!', {
          position: toast.POSITION.BOTTOM_LEFT
      })
        setLoading(false)
    }else{
      db.collection("users").where("email","==",email).get().then((resultSnapShot) =>{
        if(resultSnapShot.size == 0){
          const config = {
            url: 'https://electro-app-1.web.app/authentication/sign-up',
            handleCodeInApp: true
        }
        auth.sendSignInLinkToEmail(email, config)
        toast.success(`A link has been sent to ${email} INBOX Or SPAM, click the link to complete your registration.`)
        window.localStorage.setItem('emailForRegistration', email)
        setEmail("")
        setLoading(false)
        setModalShow(false)
        }else {
          //Already registered
          toast.warn("The email you enterd already in use", {
            position: toast.POSITION.TOP_LEFT
        })
          setLoading(false)
      }
      })

    }
  }
  return (
    <SoftBox p={2}>
    <center><img src={logo} className="App-logo" alt="logo" /></center>
    <center style={{fontWeight:'bold'}}>Create An Account!</center>
    <SoftBox component="form" role="form">
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Email
        </SoftTypography>
      </SoftBox>
      <SoftInput 
      value={email} onChange={e => setEmail(e.target.value)}
      type="email" placeholder="Enter your email" />
    </SoftBox>

    <SoftBox mt={4}>
      <SoftButton onClick={signUp} variant="gradient" color="info" fullWidth>
      {loading === true ?(
        <span><span style={{color:'#fff'}}>loading...<Spin size="middle" /></span></span>
      ):(
        <span>Send</span>
      )}
      </SoftButton>
    </SoftBox>
  </SoftBox>
    </SoftBox>
  )
}

export default SignUp