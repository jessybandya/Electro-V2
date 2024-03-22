import React, { useEffect, useState } from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftInput from '../../../../components/SoftInput'
import SoftTypography from '../../../../components/SoftTypography'
import brand from "../../../../assets/images/logo-ct.png";
import { auth } from '../../../../firebase'
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { updateAuthId } from '../../../../redux/dataSlice'
import {Button,Modal} from 'react-bootstrap'
import ForgotPass from './ForgotPass'
import logo from '../../../../logo.svg';


function SignIn({setModalShow}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const [modalShowForgetPass, setModalShowForgetPass] = React.useState(false);

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

  const login = (e)=> {
    e.preventDefault();
   setLoading(true)
    auth.signInWithEmailAndPassword(email,password)
    .then((auth) =>{
      setLoading(false)
      setModalShow(false)
    })
    .catch((e) =>{
            toast.error(e.message, {
              position: toast.POSITION.BOTTOM_CENTER
          })      
          setLoading(false)     
    })
}

  return (
    <SoftBox style={{marginTop:-50}} p={3}>
    <center><img src={logo} className="App-logo" alt="logo" /></center>
    <center>Welcome Back!</center>
    <SoftBox component="form" role="form">
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Email
        </SoftTypography>
      </SoftBox>
      <SoftInput type="email"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email" />
    </SoftBox>
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Password
        </SoftTypography>
      </SoftBox>
      <SoftInput type="password" 
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password" />
    </SoftBox>
    <SoftBox mt={4}>
      <SoftButton 
      onClick={login}
      variant="gradient" color="info" fullWidth>
      {loading === true ?(
        <span><span style={{color:'#fff'}}>signing in...<Spin size="middle" /></span></span>
      ):(
        <span>Sign In</span>
      )}
      </SoftButton>
    </SoftBox>
    <SoftBox mt={2} mb={-5} textAlign="center">
      <SoftTypography variant="button" color="text" fontWeight="regular">
        <SoftTypography
          variant="button"
          color="info"
          fontWeight="medium"
          textGradient
          style={{cursor:'pointer'}}
          onClick={() => setModalShowForgetPass(true)}
        >
          Forgotten Password?
        </SoftTypography>
      </SoftTypography>
    </SoftBox>
  </SoftBox>
  <Modal
  show={modalShowForgetPass}
  onHide={() => setModalShowForgetPass(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Body>
   <ForgotPass setModalShowForgetPass={setModalShowForgetPass} />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setModalShowForgetPass(false)}>Close</Button>
  </Modal.Footer>
</Modal>
    </SoftBox>
  )
}

export default SignIn