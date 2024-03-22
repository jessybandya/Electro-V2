import React, { useContext, useState, useEffect } from 'react'
import Slider from '../SliderHeader'
import "bootstrap/js/src/collapse.js";
import {Modal, Nav, Navbar, Button} from "react-bootstrap"
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import SliderOffer from '../SliderOffer';
import "./style.scss"
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import CartContext from '../../store/cart-context';
import ClearIcon from '@mui/icons-material/Clear';
import Cart from '../Cart';
import { auth, db } from "../../firebase"
import Geocode from "react-geocode";
import { useSelector, useDispatch } from 'react-redux'
import { updateLatitude, updateLongitude, updateAddress, updateAuthId } from '../../redux/dataSlice';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from './SignIn';
import SignUp from './SignUp';
import firebase from 'firebase'
import { useNavigate } from "react-router-dom"
import { UpdateOutlined } from '@material-ui/icons';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByLatLng } from 'react-google-places-autocomplete';
import Typewriter from 'typewriter-effect';
import HeaderCategories from '../MenuCategory/Header';
import { toast } from 'react-toastify';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const cartCtx = useContext(CartContext);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const address = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const history = useNavigate()
  const [currentUser1, setCurrentUser1] = useState()
  const [post, setPost] = useState()
  const authId = useSelector((state) => state.authId);
  const [loggedUser, setLoggedUser] = useState("")
  const [homeAddress, setHomeAddress] = useState('')
  const [homeLat, setHomeLat] = useState('')
  const [homeLng, setHomeLng] = useState('')
  const [inputFieldHome, setInputFieldHome] = useState('')
  const [errorAddressHome, setErrorAddressHome] = useState('')
  const [inputFieldOffice, setInputFieldOffice] = useState('')
  const [address1, setAddress1] = useState('')
  const [loggedUid, setLoggedUid] = useState(null)
  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show3, setShow3] = useState(false);

  function handleShow3(breakpoint) {
    setFullscreen(breakpoint);
    setShow3(true);
  }
console.log("Address: ", latitude)

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
        setLoggedUid(`${user?.uid}`)
      }
    })
    return () => unsubscribe()
  }, [])


  const handleHomeLatLong = (e) =>{
    handleHomeLat(e)
    handleHomeLng(e)
    dispatch(updateAddress(e))
  }
  const handleHomeLat = (e)=>{
      setHomeAddress(e)
      geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => 
          dispatch(updateLatitude(latLng.lat))
          
      )
      .catch(error => console.error('Error', error));        
  }
  const handleHomeLng = (e)=>{
      geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => 
          dispatch(updateLongitude(latLng.lng))        
      )
      .catch(error => console.error('Error', error));        
  }

  const [open, setOpen] = React.useState(false);


  if(address === ''){
    navigator.geolocation.getCurrentPosition(function(position) {

      var lat1 = position.coords.latitude
      var long1 = position.coords.longitude
      setLat(lat1)
      setLong(long1)
     dispatch(updateLatitude(lat1))
     dispatch(updateLongitude(long1))
     getAddress(lat1,long1)
    });
  }

  useEffect(() => {
    db.collection('users').doc(`${loggedUid}`).onSnapshot((doc) => {
      setCurrentUser1(doc.data());
    });
}, [])




    // <input type="text" value={message} onChange={(event) => dispatch(updateMessage(event.target.value))}/>

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('');

// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("ke");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.

  const [lat, setLat] = useState(`${latitude}`)
  const [long, setLong] = useState(`${longitude}`)

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {

      var lat1 = position.coords.latitude
      var long1 = position.coords.longitude
      setLat(lat1)
      setLong(long1)
     dispatch(updateLatitude(lat1))
     dispatch(updateLongitude(long1))
     getAddress(lat1,long1)
    });
  }

  const clearMyLocation = () => {
    dispatch(updateAddress(''))
    dispatch(updateLatitude(''))
    dispatch(updateLongitude(''))
  }

  console.log(`Lat: ${latitude}`)
  console.log(`Long: ${longitude}`)
  const getAddress = (lat, lng) => {
    // Get address from latitude & longitude.
Geocode.fromLatLng(lat, lng).then(
  (response) => {
    const address = response.results[0].formatted_address;
    dispatch(updateAddress(address))
    toast.success(`Your current address-> ${address}`)
  },
  (error) => {
    console.error(error);
  }
);
  }


  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const {items} = cartCtx;
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

  return (
    <div>
            <Modal show={show4} onHide={handleClose4}>
        <Modal.Body style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
        <HeaderCategories handleClose={handleClose4}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              <div className="homepage-header">
              {/* <div id="preloader"><div className="preloader"><span /><span /></div></div> */}

        <div className="overlay" />


        <section style={{marginTop:-88}}  className="pb-5 homepage-search-block position-relative">
          <div className="banner-overlay" />
          <div style={{marginTop:60}} className="container">
            <div className="row d-flex align-items-center py-lg-4">
              <div className="col-lg-8 mx-auto">
                <div style={{marginTop:20}}  className="homepage-search-title text-center">
                  <h5 className="mb-5 text-shadow text-white-50 font-weight-normal"></h5>
                </div>
                <div className="homepage-search-form">
            {/* <center><button onClick={clearMyLocation}>Clear Address</button></center> */}
                {/* <center>
            {!address ?(
                <GooglePlacesAutocomplete
                style={{width:'100%'}}
   apiKey={''}
   selectProps={{
   placeholder: `Nairobi, Kenya`,
   name:"address",
   inputValue:inputFieldHome['address'],
   onInputChange : (e)=>{setInputFieldHome({...inputFieldHome, ['address']: e})},
   onChange:(place) => {handleHomeLatLong(place.label); setErrorAddressHome(false);}
   }}
/>
            ):(
              <GooglePlacesAutocomplete
              style={{width:'100%'}}
 apiKey={''}
 selectProps={{
 placeholder: `${address}`,
 name:"address",
 inputValue:inputFieldHome['address'],
 onInputChange : (e)=>{setInputFieldHome({...inputFieldHome, ['address']: e})},
 onChange:(place) => {handleHomeLatLong(place.label); setErrorAddressHome(false);}
 }}
/>
            )}

                                 
                </center> */}
                {address ?(
                <center>
                <div style={{display:'flex',width:'100%',flexWrap:'wrap',alignItems:'center'}}>
                <div style={{width:'80%',borderRadius:5}}>
                <GooglePlacesAutocomplete
                style={{width:'100%'}}
   apiKey={''}
   selectProps={{
   placeholder: `${address}`,
   name:"address",
   inputValue:inputFieldHome['address'],
   onInputChange : (e)=>{setInputFieldHome({...inputFieldHome, ['address']: e})},
   onChange:(place) => {handleHomeLatLong(place.label); setErrorAddressHome(false);}
   }}
/>
                  </div>
                  <div>
                    <center>
                    <button onClick={() => setShow3(true)} style={{backgroundColor:'#e74c3c',height:38,color:'#fff',fontWeight:'bold',padding:5,borderRadius:2,marginLeft:5,alignItems:'center'}}><AddLocationAltIcon style={{fontSize:25}}/></button>
                    </center>
                    </div>
                </div>
              </center>
                ):(
                  <center>
                  <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                  <div style={{width:'80%',borderRadius:5}}>
                <GooglePlacesAutocomplete
                style={{width:'100%'}}
   apiKey={''}
   selectProps={{
   placeholder: `Nairobi, Kenya`,
   name:"address",
   inputValue:inputFieldHome['address'],
   onInputChange : (e)=>{setInputFieldHome({...inputFieldHome, ['address']: e})},
   onChange:(place) => {handleHomeLatLong(place.label); setErrorAddressHome(false);}
   }}
/>
                  </div>
                  
                  <div style={{width:'20%'}}>
                  <button onClick={() => setShow3(true)} style={{backgroundColor:'#e74c3c',height:38,color:'#fff',fontWeight:'bold',padding:5,borderRadius:2,marginLeft:5,alignItems:'center'}}><AddLocationAltIcon style={{fontSize:25}}/></button>
                    </div>
                  </div>
                </center>
                )}
        <center style={{marginTop:20}}>

        <h2><span style={{color:'#fff',marginTop:10}}><span> Get elecronics delivery in Kenya.</span>
                    </span></h2>
                  <h5 style={{marginTop:10,color:'#E8E8E8',fontWeight:'800'}}>
                    <p style={{color:'wheat'}}>Get affordable electronics and delivered to you at an affordable price.</p>
                    <Typewriter
  options={{
    strings: ['Best Seller connection.', 'Spark & affordable products.','With instant Order.','Fast Delivery on time.'],
    autoStart: true,
    loop: true,
  }}
/> 
                    </h5>
        </center>
                </div>
                <div style={{marginTop:100}}>
                <h6 className="mt-4 text-shadow text-white font-weight-normal">E.g. Mobiles, Laptops, Scanners, Microwaves...</h6>
                <Slider/>
                </div>

              </div>
              
            </div>
          </div>

        </section>
        <Modal show={show3} fullscreen={fullscreen} onHide={() => setShow3(false)}>
        <Modal.Header closeButton>
          <CancelIcon onClick={() => setShow3(false)}/>
        </Modal.Header>
        <Modal.Body>
          <h1>Hello</h1>
        </Modal.Body>
      </Modal>
      </div>

    </div>
  )
}

export default Header