import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import Post from './Post';
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
function SliderRestaurants() {
  const [posts, setPosts] = useState([])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 2000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
      db.collection('branches').onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);

  return (
    <div style={{padding:20}}>
         <div className="section-header text-center">
     <h2>Highly Rated Branches</h2>
     <p>Top branches, based on trends</p>
     <span className="line" />
  </div>
  <div style={{padding:20}}>
  <Carousel responsive={responsive}
    swipeable={true}
    draggable={true}
    showDots={false}
    // ssr={true} // means to render carousel on server-side.
    infinite={true}
    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
    // autoPlaySpeed={1000}
    // keyBoardControl={true}
    // customTransition="all .5"
    // transitionDuration={500}
    // containerClass="carousel-container"
    // removeArrowOnDeviceType={["tablet", "mobile"]}
    // deviceType={this.props.deviceType}
    // dotListClass="custom-dot-list-style"
    // itemClass="carousel-item-padding-40-px"
    >
      
{
              posts.map(({id, post}) => (
                <Post
                key={id} 
                branchImg={post.branchImg}
                branchName={post.branch}
                restAddress={post.restAddress}
                status={post.status}
                closingTime={post.closingTime}
                openingTime={post.openingTime}
                resId={id}
                branchAddress={post.branchAddress}
                restaurant={post.restaurant}
                branchId={id}
                />
              ))
            }   
</Carousel>
  </div>

    
    </div>
  )
}

export default SliderRestaurants


