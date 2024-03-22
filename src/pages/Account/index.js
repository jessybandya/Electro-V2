import React, { useEffect, useState } from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import "./styles.css"
import Header from '../../layouts/profile/components/Header'
import ProfileInfoCard from '../../examples/Cards/InfoCards/ProfileInfoCard'
import { Grid } from '@mui/material'
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ProfilesList from '../../examples/Lists/ProfilesList'
import profilesListData from '../../layouts/profile/data/profilesListData'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyArticles from './MyArticles'
import Orders from './Orders'

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

function Account() {
  const authId = useSelector((state) => state.authId);

  const [currentUser, setCurrentUser] = useState()
  const [countArtcles, setCountArticles] = useState(0)

  useEffect(() => {
    db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

React.useEffect(() => {
  db.collection('users').doc(`${authId}`).collection('orders')
 .onSnapshot(snapshot => (
  setCountArticles(snapshot.docs.length)
 ))
}, []);

const theme = useTheme();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};

const [data, setData] = React.useState([])
React.useEffect(() => {
  db.collection('users').doc(`${authId}`).collection('orders').onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
  })
})
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <Header countArtcles={countArtcles} firstName={currentUser?.firstName} lastName={currentUser?.lastName} profilePhoto={currentUser?.profilePhoto}/>
    <Box>
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        style={{zIndex:1,backgroundColor:'#fff'}}
      >
        <Tab label="Profile Info." {...a11yProps(0)} />
        <Tab label="Orders" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}
      style={{
        height: '65vh',
        overflowY: 'auto'
       }}
      >
      <Grid container spacing={1}>
      <Grid item xs={12} md={6} xl={6} style={{display:'table',margin:'auto'}}>
      <ProfileInfoCard
        title="profile Info."
        description={`Hi, I’m ${currentUser?.firstName} ${currentUser?.lastName}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`}
        info={{
          fullName: `${currentUser?.firstName} ${currentUser?.lastName}`,
          mobile: `${currentUser?.phone}`,
          email: `${currentUser?.email}`,
        }}
        social={[
          {
            link: "#",
            icon: <FacebookIcon />,
            color: "facebook",
          },
          {
            link: "#",
            icon: <TwitterIcon />,
            color: "twitter",
          },
          {
            link: "#",
            icon: <InstagramIcon />,
            color: "instagram",
          },
        ]}
        action={{ route: "", tooltip: "Edit Profile" }}
      />
    </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}
      style={{
        height: '65vh',
        overflowY: 'auto'
       }}
      >
        <Orders/>
      </TabPanel>

    </SwipeableViews>
  </Box>

    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Account