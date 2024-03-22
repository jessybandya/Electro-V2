import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link } from "react-router-dom";
import MenuCategory from "../MenuCategory";
import Slider1 from "../MenuCategory/Slider1";


const HomeCategories = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('menus').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()))
    })
}, []);

  return (
    <>
      <section className='Discount background NewArrivals'>
        <div className='container'>

            <center><h2 style={{fontWeight:'bold',marginTop:-30}}>Our Categories</h2></center>

          <Slider1/>
        </div>
      </section>
    </>
  )
}

export default HomeCategories
