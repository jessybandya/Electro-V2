import React, { useEffect, useState, useContext } from 'react'
import { auth, db } from '../../firebase';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByLatLng } from 'react-google-places-autocomplete';
import Cart from '../Cart';
import CartContext from '../../store/cart-context';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';
import SignIn from '../../sub-components/Header/SignIn';
import SignUp from '../../sub-components/Header/SignUp';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import SummuryOrder from './SummuryOrder';
import swal from "@sweetalert/with-react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" }
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA"
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function OnDelivery() {
  var currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [inputFieldHome, setInputFieldHome] = useState('')
  const [errorAddressHome, setErrorAddressHome] = useState('')
  const [homeLat, setHomeLat] = useState('')
  const [homeLng, setHomeLng] = useState('')
  const [homeAddress, setHomeAddress] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [credit, setCredit] = useState(false)
  const [mob, setMob] = useState(false)
  const [delivery, setDelivery] = useState(false)
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [show1, setShow1] = useState(false);
  const cartCtx = useContext(CartContext);
  const authId = useSelector((state) => state.authId);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const creditFun = () => {
    setCredit(true)
    setMob(false)
    setDelivery(false)
  }
  const mobFun = () => {
    setCredit(false)
    setMob(true)
    setDelivery(false)
  }
  const deliveryFun = () => {
    setCredit(false)
    setMob(false)
    setDelivery(true)
  }
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState()

  useEffect(() => {
    db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
      setUser(doc.data());
    });
}, [])
console.log("My ID: ", authId)
  const handleClickOpen = () => {
    if(!(cartCtx?.items?.length > 0)){
      toast.error("You cannot proceed with an empty cart!")
 }else{
  swal(`Kindly recheck on date & time of picking: ${selectedDate}`)
  setOpen(true)
 }

  };

  const handleClose3 = () => {
    setOpen(false);
  };
const history = useNavigate()

	const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const itemsPrice = totalAmount;
  const taxPrice = `${cartCtx.totalAmount.toFixed(2)}` * 15/100;
  const shippingPrice = itemsPrice < 150 ? "Free" : 20.00;
  const totalPrice =
    shippingPrice === "Free"
      ? itemsPrice * 1 + taxPrice
      : itemsPrice * 1 + taxPrice + shippingPrice;

  var discoMultiPly = totalPrice * 0.2
  // const discount = 
  //    totalPrice > 2000 ? totalPrice = totalPrice - discoMultiPly : totalPrice = totalPrice - 0



  const handleHomeLatLong = (e) =>{
    handleHomeLat(e)
    handleHomeLng(e)
    setShow(false)
  }
  const handleHomeLat = (e)=>{
      setHomeAddress(e)
      geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => 
          setHomeLat(latLng.lat),           
      )
      .catch(error => console.error('Error', error));        
  }
  const handleHomeLng = (e)=>{
      geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => 
          setHomeLng(latLng.lng),           
      )
      .catch(error => console.error('Error', error));        
  }

  console.log("Address: ", homeAddress)
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])


  const addOrder = () => {

    db.collection("orders").add({
      uid:authId,
      updatedBy:authId,
      total:totalPrice,
      deliveryAddress:homeAddress,
      paymentType:'cash',
      isPaid:false,
      updatedOn:selectedDate,
      items:cartCtx.items
    })
    
    db.collection("users").doc(authId).collection("orders").add({
      uid:authId,
      updatedBy:authId,
      total:totalPrice,
      deliveryAddress:homeAddress,
      paymentType:'cash',
      isPaid:false,
      updatedOn:selectedDate,
      items:cartCtx.items
    })
    history("/")
    swal("Your order has been sent!\nThanks for shopping with Us ✔️!")
    cartCtx.clearCart();
    window.localStorage.removeItem('Python1');
    window.localStorage.removeItem('Python');
    window.location.reload();
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


  return (
    <div>
         <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="offer-dedicated-body-left">

              <div className="pt-2" />
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h4 className="mb-1">Choose a delivery address</h4>
                <h6 className="mb-3 text-black-50">Multiple addresses in this location</h6>
                <div className="row">

                  <div className="col-md-6">
                    <div className="bg-white card addresses-item">
                      <div className="gold-members p-4">
                        <div className="media">
                          <div className="mr-3"><i className="icofont-location-pin icofont-3x" /></div>
                          <div className="">
                            <h6 className="">Date & Time</h6>
                            <p>Choose a date of getting deliveries
                            </p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

<KeyboardDateTimePicker
    id="time-picker"
    label="Date & Time picker"
    value={selectedDate}
    onChange={handleDateChange}
/>
  
</MuiPickersUtilsProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleClickOpen} style={{marginBottom:5}}>Proceed</Button>

              {/* <div className="bg-white rounded shadow-sm p-4 osahan-payment">
                <h4 className="mb-1">Choose payment method</h4>
                <div className="row">
                  <div className="col-sm-4 pr-0">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" onClick={creditFun} role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="icofont-credit-card" /> Credit/Debit Cards</a>
                      <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" onClick={mobFun} aria-controls="v-pills-settings" aria-selected="false"><i className="icofont-bank-alt" /> Mobile Money</a>
                      <a className="nav-link" id="v-pills-cash-tab" data-toggle="pill" href="#v-pills-cash" role="tab" aria-controls="v-pills-cash" onClick={deliveryFun} aria-selected="false"><i className="icofont-money" /> Pay on Delivery</a>
                    </div>
                  </div>
                  <div className="col-sm-8 pl-0">
                    <div className="tab-content h-100" id="v-pills-tabContent">
                      <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h6 className="mb-3 mt-0 mb-3">Add new card</h6>
                        <p>WE ACCEPT <span className="osahan-card">
                            <i className="icofont-visa-alt" /> <i className="icofont-mastercard-alt" /> <i className="icofont-american-express-alt" /> <i className="icofont-payoneer-alt" /> <i className="icofont-apple-pay-alt" /> <i className="icofont-bank-transfer-alt" /> <i className="icofont-discover-alt" /> <i className="icofont-jcb-alt" />
                          </span>
                        </p>
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label htmlFor="inputPassword4">Card number</label>
                              <div className="input-group">
                                <input type="number" className="form-control" placeholder="Card number" />
                                <div className="input-group-append">
                                  <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="icofont-card" /></button>
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8">
                              <label>Valid through(MM/YY)
                              </label>
                              <input type="number" className="form-control" placeholder="Enter Valid through(MM/YY)" />
                            </div>
                            <div className="form-group col-md-4">
                              <label>CVV
                              </label>
                              <input type="number" className="form-control" placeholder="Enter CVV Number" />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Name on card
                              </label>
                              <input type="text" className="form-control" placeholder="Enter Card number" />
                            </div>
                            <div className="form-group col-md-12">
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Securely save this card for a faster checkout next time.</label>
                              </div>
                            </div>
                            <div className="form-group col-md-12 mb-0">
                              <a onClick={addOrder} className="btn btn-success btn-block btn-lg">PAY Ksh{totalPrice}
                                <i className="icofont-long-arrow-right" /></a>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        <h6 className="mb-3 mt-0 mb-3">Mobile Money</h6>
                        <form>
                          <hr />
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label>Select
                              </label>
                              <br />
                              <select className="custom-select form-control">
                                <option selected>Bank</option>
                                <option value={1}>One</option>
                                <option value={2}>Two</option>
                                <option value={3}>Three</option>
                              </select>
                            </div>
                            <div className="form-group col-md-12 mb-0">
                              <a onClick={addOrder} className="btn btn-success btn-block btn-lg">PAY Ksh{totalPrice}
                                <i className="icofont-long-arrow-right" /></a>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="v-pills-cash" role="tabpanel" aria-labelledby="v-pills-cash-tab">
                        <h6 className="mb-3 mt-0 mb-3">Cash</h6>
                        <p>Please keep exact change handy to help us serve you better</p>
                        <hr />
                        <form>
                          {!authId ?(
                          <a onClick={handleShow1} className="btn btn-success btn-block btn-lg">PAY Ksh{totalPrice}
                          <i className="icofont-long-arrow-right" /></a>
                          ):(
                            <a onClick={addOrder} className="btn btn-success btn-block btn-lg">PAY Ksh{totalPrice}
                            <i className="icofont-long-arrow-right" /></a>
                          )}

                        </form></div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div style={{marginTop:10}} className="col-md-4 mt-10">
          <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
              <div className="d-flex mb-4 osahan-cart-item-profile">
                <div className="d-flex flex-column">
                  <center style={{fontWeight:'bold',color:'#fff'}}>YOUR ORDERs
                  </center>
                </div>
              </div>
              <div style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }} className="bg-white rounded shadow-sm mb-2">

              <Cart />
              </div>
              <div className="mb-2 bg-white rounded p-2 clearfix">
                <p className="mb-1">Item Total <span className="float-right text-dark">Ksh {numberWithCommas(parseFloat(itemsPrice).toFixed(2))}</span></p>
                <p className="mb-1">Tax <span className="float-right text-dark">Ksh {numberWithCommas(parseFloat(taxPrice).toFixed(2))}</span></p>
                <p className="mb-1">Delivery Fee <span className="text-info" data-toggle="tooltip" data-placement="top" title="Total discount breakup">
                    <i className="icofont-info-circle" />
                  </span> <span className="float-right text-dark">{itemsPrice > 150 &&(<>Ksh </>)}{numberWithCommas(parseFloat(shippingPrice).toFixed(2))}</span>
                </p>
                <hr />
                <h6 className="font-weight-bold mb-0">TO PAY <span className="float-right">Ksh {numberWithCommas(parseFloat(totalPrice).toFixed(2))}</span></h6>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
    <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
        <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{backgroundColor:'#f5461b'}}
          
        >
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
        </Modal.Header>
        <Modal.Body>
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn handleClose={handleClose1}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <SignUp handleClose={handleClose1}/>
        </TabPanel>

      </SwipeableViews>
    </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: '#f5461b'}} variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar style={{backgroundColor:'#e74c3c'}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose3}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
           </Toolbar>
        </AppBar>
        <List>
        <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="offer-dedicated-body-left">

              <div className="pt-2" />
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h4 className="mb-1">Your Items with Restaurants Info</h4>
               <SummuryOrder />
              </div>





            </div>
          </div>
          <div style={{marginTop:10}} className="col-md-4 mt-10">
          <div className="d-flex mb-4 osahan-cart-item-profile">
                <div className="d-flex flex-column">
                  <center style={{fontWeight:'bold',color:'#000'}}>YOUR Info
                  </center>
                </div>
              </div>
          <div className="bg-white rounded shadow-sm mb-2">
              <TextField
              style={{width:"100%"}}
          id="outlined-read-only-input"
          label="First Name"
          value={user?.firstName}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />
        <TextField
              style={{width:"100%",marginTop:15}}
          id="outlined-read-only-input"
          label="Last Name"
          value={user?.lastName}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />
                <TextField
              style={{width:"100%",marginTop:15}}
          id="outlined-read-only-input"
          label="Email"
          value={user?.email}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />
                <TextField
              style={{width:"100%",marginTop:15}}
          id="outlined-read-only-input"
          label="Phone Number"
          value={user?.phoneNumber}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />
                <TextField
              style={{width:"100%",marginTop:15}}
          id="outlined-read-only-input"
          label="Date & Time Of Delivery"
          defaultValue={`${selectedDate}`}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />

<TextField
              style={{width:"100%",marginTop:15}}
          id="outlined-read-only-input"
          label="Address Of Delivery"
          defaultValue={`${homeAddress}`}
          InputProps={{
            readOnly: true,
            style: {
              height: "35px",
            },
          }}
        />
              </div>
              <hr />
              <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
              <div className="mb-2 bg-white rounded p-2 clearfix">
              <p className="mb-1">Item Total <span className="float-right text-dark">Ksh {numberWithCommas(parseFloat(itemsPrice).toFixed(2))}</span></p>
              <p className="mb-1">Tax <span className="float-right text-dark">Ksh{numberWithCommas(taxPrice)}</span></p>
              <p className="mb-1">Delivery Fee <span className="text-info" data-toggle="tooltip" data-placement="top" title="Total discount breakup">
                  <i className="icofont-info-circle" />
                </span> <span className="float-right text-dark">{itemsPrice > 150 &&(<>Ksh </>)}{numberWithCommas(parseFloat(shippingPrice).toFixed(2))}</span>
              </p>
              <hr />
              <h6 className="font-weight-bold mb-0">TO PAY <span className="float-right">Ksh {numberWithCommas(parseFloat(totalPrice).toFixed(2))}</span></h6>
            </div>
          </div>
              <Button onClick={addOrder} style={{marginBottom:5}}>Payments</Button>

          </div>
        </div>
      </div>

    </section>
        </List>
      </Dialog>
  </div>

  )
}

export default OnDelivery