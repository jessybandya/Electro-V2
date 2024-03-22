import React, { useEffect, useState } from "react"
import Post from "./Post"
import { db } from "../../firebase"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link } from "react-router-dom";
import DiscountIcon from '@mui/icons-material/Discount';

const Offers = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('meals').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()))
    })
}, []);

  return (
    <>
      <section style={{marginTop:-100}} className=''>
        <div className='container'>
          <div className='heading d_flex'>
          <div className="col-md-5">
              <div className="main-title-tt">
                <div className="main-title-left">
                  <span>Offers & Deals</span>
                  <h2>Meals</h2>
                </div>
              </div>
            </div>
            <div className='heading-right row '>
                <Link to="/menu">
                <span style={{fontWeight:'bold'}} className="see-more-btn">View all</span>
                </Link>
            </div>
          </div>
          <Post posts={posts}/>
        </div>
      </section>
    </>
  )
}

export default Offers
