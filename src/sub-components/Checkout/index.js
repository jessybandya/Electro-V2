import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';
import OnDelivery from '../OnDelivery';
import OnPickUp from '../OnPickUp';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import DefaultNavbar from '../../examples/Navbars/DefaultNavbar';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
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
function Checkout() {
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const theme = useTheme();
    const authId = useSelector((state) => state.authId);
    const history = useNavigate()
    const [value, setValue] = React.useState(0);
    const [show1, setShow1] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
      }; 

      if(!authId){
        history("/")
      }
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div>
        <AppBar sx={{ position: 'absolute', backgroundColor:'#fff',zIndex:1,marginTop:10 }}
>        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{backgroundColor:'#fff'}}          
        >
          <Tab label="On Dellivery" {...a11yProps(0)} />
          <Tab label="On PickUp" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
        <Box sx={{ bgcolor: 'background.paper'}}>
        <TabPanel value={value} index={0} dir={theme.direction}>
           <OnDelivery />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <OnPickUp />
     </TabPanel>
    </Box>
    </div>
    </DashboardLayout>
  )
}

export default Checkout