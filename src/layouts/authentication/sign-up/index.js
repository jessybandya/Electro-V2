import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";
import Socials from "../components/Socials";
import Separator from "../components/Separator";

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";
import { Space, Spin } from 'antd';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { auth, db } from "../../../firebase";
import { updateAuthId } from "../../../redux/dataSlice";
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../../logo.svg';



function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [reg, setReg] = useState('')
  const [year, setYear] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate("");
  const dispatch = useDispatch();


  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  useEffect(()=>{
    setEmail(window.localStorage.getItem("emailForRegistration"));
}, [])

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user){
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
          
        }
      })
      dispatch(updateAuthId(user?.uid))

    }
  })
  return () => unsubscribe()
}, [])

const completeRegistration = async() => {
  setLoading(true)

  if(!firstName){
    toast.error('First Name is required!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(!lastName){
    toast.error('Last Name is required!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(!phone){
    toast.error('Phone No. is required!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(!password){
    toast.error('Password is required!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(!cPassword){
    toast.error('Confirm Password is required!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(password.length <8){
    toast.error('Password must have atleast 8 characters!', {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else if(cPassword !== password){
    toast.error("Passwords don't match each other!", {
      position: toast.POSITION.BOTTOM_CENTER
  })
    setLoading(false)
  }else{
    try{
      const result = await auth.signInWithEmailLink(
          email, 
          window.location.href
          );
      
      if(result.user.emailVerified){
          //remove user email from localstaorage
          //get user id token
          window.localStorage.removeItem("emailForRegistration");
          
          let user = auth.currentUser
          await user.updatePassword(password);
          const idTokenResult = await user.getIdTokenResult();

          db.collection('users').doc(user.uid).set({
              uid: user.uid,
              firstName,
              lastName,
              phone,
              regNo:reg,
              yos:year,
              email: user.email,
              profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
              status:"active",
              type:"user",
              isApproved:true,
              timestamp: Date.now()
          })   
          //redirect
           setLoading(false)
           toast.success("Succefully created an account!")
          history('/')
      }
      
      }catch(error){
        setLoading(false)
      //
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}
  }
}


  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Complete Registration!
          </SoftTypography>
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox style={{display:'flex'}} mb={2}>
              <SoftInput style={{marginRight:3}}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First Name" />
              <SoftInput style={{marginLeft:3}} 
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last Name" />
            </SoftBox>
            <SoftBox style={{backgroundColor:'#fff'}} mb={2}>
              <SoftInput  type="email" value={email} disabled/>
            </SoftBox>
          <SoftBox style={{display:'flex'}} mb={2}>
          <SoftInput style={{marginRight:3}}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone No." />
        </SoftBox>

        <SoftBox style={{display:'flex'}} mb={2}>
        <SoftInput style={{marginRight:3}}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password" />
        <SoftInput style={{marginLeft:3}}
        value={cPassword}
        type="password"
        onChange={e => setCPassword(e.target.value)}
        placeholder="Confirm Password" />
      </SoftBox>
 
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={completeRegistration} variant="gradient" color="dark" fullWidth>
              {loading === true ?(
                <span><span style={{color:'#fff'}}>signing up...<Spin size="middle" /></span></span>
              ):(
                <span>Send</span>
              )}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
