import React, {useState} from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { auth,db, googleProvider,facebookProvider,GithubProvider, TwitterProvider } from '../../../firebase';
import { toast } from 'react-toastify'
import Button from '@mui/material/Button';
import { updateAuthId } from '../../../redux/dataSlice';
import { Modal, Button as Button1 } from 'react-bootstrap';
import swal from '@sweetalert/with-react';


function SignIn({ handleClose }) {
  const [email, setEmail] = useState('');
  const history = useNavigate('');
  const [password, setPassword] = useState('');
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const authId = useSelector((state) => state.authId);
  const [show, setShow] = useState(false);
  const [email1, setEmail1] = useState("")

  const handleClose1 = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = async(e)=> {
    e.preventDefault();
    setLoading(true)
      try{
        const result = await auth.signInWithEmailAndPassword(email, password)
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }
  
        });
        toast.success("Welcome Back")
        handleClose()
        window.localStorage.setItem('uid', auth?.currentUser?.uid)
        dispatch(updateAuthId(auth?.currentUser?.uid))
       }catch(error){
         toast.error(error.message)
         setLoading(false)
  
       }
 

  }

  const googleLogin = async () =>{
    auth
    .signInWithPopup(googleProvider)
    .then( async(result)=>{
     const {user} = result;
     const idTokenResult = await user.getIdTokenResult();
     dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        email: user.email,
        token: idTokenResult.token,
      },

    })
    }).then((s) => {
      db.collection('users').doc(auth?.currentUser?.uid).set({
        uid: auth?.currentUser?.uid,
        displayName: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        profilePhoto: auth?.currentUser?.photoURL,
        fromApp: "Dot Dellivery Client Web",
        homeAddress:"",
        homeLat:"",
        homeLng:"",
        officeAddress:"",
        officeLat:"",
        officeLng:"",
        status:"active",
        type:"user",
        authType:'google auth',
        timestamp: Date.now()
      })
          .then((r) => {
              handleClose()
              toast.success("Welcome Back!")
              dispatch(updateAuthId(auth?.currentUser?.uid))
          })
          window.localStorage.setItem('uid', auth?.currentUser?.uid)

  })
    .catch((err) => {
      toast.error(err.message)
    })
  }


  const facebookLogin = async () =>{
    auth
    .signInWithPopup(facebookProvider)
    .then( async(result)=>{
     const {user} = result;
     const idTokenResult = await user.getIdTokenResult();
     dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        email: user.email,
        token: idTokenResult.token,
      },

    })
    }).then((s) => {
      db.collection('users').doc(auth?.currentUser?.uid).set({
        uid: auth?.currentUser?.uid,
        displayName: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        profilePhoto: auth?.currentUser?.photoURL,
        fromApp: "Dot Dellivery Client Web",
        homeAddress:"",
        homeLat:"",
        homeLng:"",
        officeAddress:"",
        officeLat:"",
        officeLng:"",
        status:"active",
        type:"user",
        authType:'facebook Auth',
        timestamp: Date.now()
      })
          .then((r) => {
              handleClose()
              toast.success("Welcome Back!")
              dispatch(updateAuthId(auth?.currentUser?.uid))
          })
          window.localStorage.setItem('uid', auth?.currentUser?.uid)

  })
    .catch((err) => {
      toast.error(err.message)
    })
  }

  const resetPasword = async(e) =>{
    e.preventDefault();
    setLoading1(true)

    const config ={
      url: 'https://dotdelivery-fbd89.web.app/',
      handleCodeInApp: true
  };

    await auth
    .sendPasswordResetEmail(email1,config)
    .then(() => {
     setEmail1('')
     handleClose1()
     setLoading1(false)
     toast.success("Check your email for password reset")
    })
    .catch((error)=>{
      setLoading1(false)
     swal(error.message)
    })
  }


  return (
    <div>

                <h3 className="login-heading mb-4">Welcome back!</h3>
                  <div className="">
                  <TextField
          id="outlined-textarea"
          label="E-mail Address"
          type="email"
          fullWidth
          value={email} onChange={e => setEmail(e.target.value)}
          inputProps={{
            style: {
              height: "18px",
            },
          }}
        />
                  </div>
                  <br />

                  <div className="">
                  <TextField
          id="outlined-textarea"
          label="Password"
          type="password"
          fullWidth
          value={password} onChange={e => setPassword(e.target.value)}
          inputProps={{
            style: {
              height: "18px",
            },
          }}
        />
                  </div>
                  <br />
                  <center><Button onClick={login} style={{backgroundColor:'#f5461b',color:'#fff',fontWeight:'bold',width:'100%',height:35}}>
                  {loading === true ?(
                      <span><CircularProgress style={{color:'#fff',alignItems:'center',height:14,width:14}}/><span style={{color:'#fff'}}>loading...</span></span>
                    ):(
                      <span>Sign In</span>
                    )}
                    </Button></center>
                  <div onClick={handleShow} style={{cursor:'pointer'}} className="text-center pt-3">
                    Forgot password?
                  </div>
                <hr className="my-4" />
                <div className="row" >
                  <div className="col pr-2">
                    <center>
                    <GoogleButton 
  onClick={googleLogin}
/>
                    </center>
                      
                  </div>
                  <div className="col pl-2">
                    <center><FacebookLogin 
                  buttonStyle={{height:50,padding:8,width:243,marginTop:5}}
  onClick={facebookLogin}
/></center>                  
                  </div>
                </div>


      <Modal show={show} onHide={handleClose1}>

        <Modal.Body>
        <div>
                  <center style={{fontWeight:'bold'}}>Reset Password</center>
                  <br />
                  <div>
                  <TextField
          id="outlined-textarea"
          label="Enter your E-mail Address"
          type="email"
          fullWidth
          value={email1} onChange={e => setEmail1(e.target.value)}
          inputProps={{
            style: {
              height: "18px",
            },
          }}
        />
        <br /> <br/>
                  </div>
                  <center><Button onClick={resetPasword} style={{backgroundColor:'#f5461b',color:'#fff',fontWeight:'bold',width:'100%',height:35}}>
                  {loading1 === true ?(
                      <span><CircularProgress style={{color:'#fff',alignItems:'center',height:14,width:14}}/><span style={{color:'#fff'}}>loading...</span></span>
                    ):(
                      <span>Submit</span>
                    )}
                    </Button></center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button1 variant="primary" onClick={handleClose1}>
            Cancel
          </Button1>
        </Modal.Footer>
      </Modal>
              </div>
  )
}

export default SignIn