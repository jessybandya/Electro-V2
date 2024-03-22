import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth, db } from '../../firebase'
import { Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import BuildByDevelopers from '../../layouts/dashboard/components/BuildByDevelopers'
import WorkWithTheRockets from '../../layouts/dashboard/components/WorkWithTheRockets'
import ReportsBarChart from '../../examples/Charts/BarCharts/ReportsBarChart'
import GradientLineChart from '../../examples/Charts/LineCharts/GradientLineChart'
import gradientLineChartData from '../../layouts/dashboard/data/gradientLineChartData'
import SoftBox from '../../components/SoftBox'
import Icon from "@mui/material/Icon";
import typography from '../../assets/theme/base/typography'
import reportsBarChartData from '../../layouts/dashboard/data/reportsBarChartData'
import Projects from '../../layouts/dashboard/components/Projects'
import OrdersOverview from '../../layouts/dashboard/components/OrderOverview'
import  { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Typewriter from 'typewriter-effect';
import HomeCategories from '../../sub-components/HomeCategories'
import TopRatedRestaurants from '../../sub-components/TopRatedRestaurants'
import NewMenus from '../../sub-components/NewMenus'
import Offers from '../../sub-components/Offers'
import Header from '../../sub-components/Header'
import HighRatedMenus from '../../sub-components/HighRatedMenus'
import NewArrivals from '../../sub-components/NewArrivals'







function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [membersData, setMembers] = React.useState(0)
  const [articlesData, setArticles] = React.useState(0)
  const [eventsData, setEvents] = React.useState(0)
  const [albumsData, setAlbums] = React.useState(0)


  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('articles').onSnapshot((snapshot) => {
      setArticles(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('events').onSnapshot((snapshot) => {
      setEvents(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setAlbums(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  const logout = () => {
    auth.signOut();
    history("/")
    dispatch(updateAuthId(''))
    window.location.reload();
}

  const myStyle={
      backgroundImage:"url(" +
  "images/bg/1.jpg"+")",
  height:'100px'
      };

  return (
    <DashboardLayout>
    <DashboardNavbar />

    <div>
    <div className="grocery-theme">
{/* ============================================================== */}
{/* Preloader - style you can find in spinners.css */}
{/* ============================================================== */}
{/* <div id="preloader"><div className="preloader"><span /><span /></div></div> */}
{/* ============================================================== */}
{/* Main wrapper - style you can find in pages.scss */}
{/* ============================================================== */}
<div id="main-wrapper">
{/* ============================================================== */}
{/* Top header  */}
{/* <Header/>
 ============================================================== */}
{/* Start Navigation */}
<Header/>

   <HighRatedMenus />

<NewArrivals />


</div>
</div>
</div>


      <Footer />
    {/* Back to top */}
    <a href="#" onclick="topFunction()" id="back-to-top" className="back-to-top rounded-pill fs-5"><i data-feather="arrow-up" className="fea icon-sm icons align-middle" /></a>
    {/* Back to top */}
    {/* JAVASCRIPTS */}
    {/* Custom */}
    </DashboardLayout>
  )
}

export default Admin