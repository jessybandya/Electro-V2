import React, { useState, useEffect, useContext } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux'

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "../../../examples/Breadcrumbs";
import NotificationItem from "../../../examples/Items/NotificationItem";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "./styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context";
import {Button,Modal} from 'react-bootstrap';
// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";
import { auth, db } from "../../../firebase";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { updateAuthId } from "../../../redux/dataSlice";
import LoginIcon from '@mui/icons-material/Login';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderCategories from '../../../sub-components/MenuCategory/Header'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'; 
import CartContext from "../../../store/cart-context";
import ClearIcon from '@mui/icons-material/Clear';
import Cart from "../../../sub-components/Cart";

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


function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const authId = useSelector((state) => state.authId);
  const history = useNavigate("")
  const dispatch1 = useDispatch();
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const {items} = cartCtx;
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);


  const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

   const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
  //   return (
  //     <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
 

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const logout = () => {
    auth.signOut();
    history("/")
    dispatch1(updateAuthId(''))
    window.location.reload();
}


  const [modalShow, setModalShow] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(`${authId}`)
  useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

const [categories, setShowCategories] = useState(false);

const handleCloseCategories = () => setShowCategories(false);
const handleShowCategories = () => setShowCategories(true);


const clearCart= () => {
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
    <>
    <AppBar
    style={{zIndex:10}}
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            {authId ?(
              <>
              <div align="right" style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>

              <Link to='/shopping'>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
            >
              SHOP
            </SoftTypography>
              </Link>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
              onClick={handleShowCategories}
              >
              Categories
            </SoftTypography>
          <IconButton
            size="medium"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon fontSize="medium" style={{color:'#e74c3c'}}>
            {miniSidenav ? <MenuOpenIcon/> : <MenuIcon />}
            </Icon>
          </IconButton>

          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
          style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
        >
        <Badge onClick={handleShowCart} badgeContent={numberOfCartItems} color="primary">
        <ShoppingCartIcon fontSize="medium"/>
      </Badge>
        </SoftTypography>
          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
        >
        <PowerSettingsNewIcon fontSize="medium" onClick={logout} style={{cursor:'pointer'}}/>
        </SoftTypography>
        </div>
              </>
            ):(
              <>
              <div style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>
              <Link to='/shopping'>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
            >
              SHOP
            </SoftTypography>
              </Link>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
              onClick={handleShowCategories}
            >
              Categories
            </SoftTypography>
            <SoftTypography
            variant="button"
            sx={({ palette: { dark, white } }) => ({
              color: light ? white.main : dark.main,
            })}
            fontWeight="medium"
            color={light ? "white" : "dark"}
            style={{marginRight:8,cursor:'pointer',fontWeight:'bold'}}
          >
          <Badge onClick={handleShowCart} badgeContent={numberOfCartItems} color="primary">
          <ShoppingCartIcon fontSize="medium"/>
        </Badge>
          </SoftTypography>
              <SoftTypography
                variant="button"
                sx={({ palette: { dark, white } }) => ({
                  color: light ? white.main : dark.main,
                })}
                fontWeight="medium"
                color={light ? "white" : "dark"}
                onClick={() => setModalShow(true)}
                style={{marginLeft:8,cursor:'pointer',fontWeight:'bold'}}
              >
              <LoginIcon fontSize="medium"/>
              </SoftTypography>
          <IconButton
            size="medium"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon style={{color:'#e74c3c'}}>
              {miniSidenav ? <MenuOpenIcon/> : <MenuIcon />}
            </Icon>
          </IconButton>
        </div>
              </>
            )}

          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
         <AppBar position="static">
           <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              style={{backgroundColor:'#fff'}}
              aria-label="full width tabs example"
            >
              <Tab label="Sign In" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
    </Modal.Header>
    <Modal.Body
    style={{
      height: '70vh',
      overflowY: 'auto'
     }}
    >
    <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={value}
    onChangeIndex={handleChangeIndex}
  >
    <TabPanel value={value} index={0} dir={theme.direction}>
      <SignIn setModalShow={setModalShow}/>
    </TabPanel>
    <TabPanel value={value} index={1} dir={theme.direction}>
      <SignUp setModalShow={setModalShow}/>
    </TabPanel>
  </SwipeableViews>

    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setModalShow(false)}>Close</Button>
    </Modal.Footer>
  </Modal>


  <Modal show={categories} onHide={handleCloseCategories}>
  <Modal.Body style={{
maxHeight: 'calc(100vh - 210px)',
overflowY: 'auto'
}}>
  <HeaderCategories handleClose={handleCloseCategories}/>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseCategories}>
      Close
    </Button>
  </Modal.Footer>
  </Modal>
  <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
        <div style={{width:'100%',alignItems:'center',justifyContent:'space-between',display:'flex'}}>
        <span><button style={{padding:4,borderRadius:8,fontWeight:'bold'}} onClick={clearCart}>Clear Cart</button></span> <span style={{fontWeight:'bold'}}>CART</span> <span><ClearIcon style={{cursor:'pointer'}} onClick={handleCloseCart}/></span>
      </div>
        </Modal.Header>
        <Modal.Body style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
        <div className="offcanvas-body p-0">
            <div className="side-cart-items">
              <Cart onCloseCart = {() => setShowCart(false)}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

            <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontWeight:'bold',color:'#cc5500'}}>Total(Ksh): {numberWithCommas(totalAmount)}</span>
              <div >
            {cartCtx.items.length > 0 &&(
                <>
                {auth?.currentUser?.uid ?(
                          <a href="/check-out" className="cart-checkout-btn hover-btn">Proceed to Checkout</a>
                ):(
                  <a onClick={() => setModalShow(true)} className="cart-checkout-btn hover-btn">Proceed to Checkout</a>
                )}
                        
                </>
            )}
        </div>
            </div>
        </Modal.Footer>
      </Modal>



    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
