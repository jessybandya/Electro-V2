import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom"
import  datas  from "../../MenuCategory"


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#88888888" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#88888888" }}
      onClick={onClick}
    />
  );
}
const Slider1 = (  ) => {


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <Slider {...settings}>


      {datas.map((data, index) => {
          return (
            <>
            <Link to={`/category/${data.id}`}>
                      <div style={{marginLeft:5, border:"1px solid #fff", borderRadius:20}} className="item">
          <div style={{backgroundColor:'#f55d2c',border:'2px solid #f55d2c',borderRadius:20,height:40}} className="woo_category_box border_style rounded">
            <div className="woo_cat_caption">
              <h4><a style={{color:'#E8E8E8',fontWeight:'900'}} >{data.name}</a></h4>
            </div>
              </div>
            </div>
            </Link>
            </>
      )})
    }



        </Slider>
    </>
  )
}

export default Slider1
