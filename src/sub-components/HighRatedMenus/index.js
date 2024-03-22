import React, { useEffect, useState } from "react"
import Post from "./Post"
import { db } from "../../firebase"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { Link } from "react-router-dom";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}

const TopRatedRestaurants = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay:true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }



useEffect(() => {
  db.collection('electronics').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
      })));
  })
}, []);

  return (
    <>
      <section style={{marginTop:-70}} className='flash'>


        <div className='container'>
        <div className='heading d_flex'>
        <div className="col-md-5">
              <div className="main-title-tt">
                <div className="main-title-left">
                  <span>Top Rated</span>
                  <h2>Electronics</h2>
                </div>
                
              </div>
              
            </div>
            <div className='heading-right row '>
                <Link to="/shopping">
                <span style={{fontWeight:'bold',marginBottom:-50}} className="see-more-btn">View all</span>
                </Link>
            </div>
          </div>
          <Slider {...settings}>

{
                        posts.map(({id, post}) => (
                           <Post
                           key={id} 
                           category={post.category}
                           description={post.description}
                           images={post.images}
                           name={post.name}
                           price={post.price}
                           timestamp={post?.timestamp}
                           electronicID={id}
                           />
                         ))
         }
</Slider>
        </div>


      </section>
    </>
  )
}

export default TopRatedRestaurants
