import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Rating from '@mui/material/Rating';


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
const Dcard = ({ posts }) => {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
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
  return (
    <>
      <Slider {...settings}>
        {posts.map((value, index) => {
          return (
            <>
                {/* <div style={{marginLeft:5}} className="">
                  <div className="woo_product_thumb">
                    <img src={value.mealImage} style={{objectFit:'cover',width:180}} alt="" />
                  </div>
                  <div className="woo_product_caption center">
                  <Rating style={{cursor:'pointer'}} name="half-rating-read" value={3.5} precision={0.5} readOnly />
                    <div className="woo_title">
                      <h4 className="woo_pro_title"><a>{value.menuName}</a></h4>
                    </div>
                  </div>
							
                </div> */}
                                <div style={{marginLeft:5, border:"1px solid #88888888",borderRadius:10}} className="item">
                  <div className="product-item">
                    <span className="product-img">
                      <img src={value.mealImage} alt="" style={{width:"100%"}}/>
                      <div className="product-absolute-options">
                        <span className="offer-badge-1">{value?.mealDiscount}% off</span>
                      </div>
                    </span>
                    <div className="product-text-dt">
                      <h4>{value.mealName.substring(0,21)}</h4>
                      <div className="product-price">P {parseFloat(value.mealPrice).toFixed(2)}<span>P 200.00</span></div>
                      {/* <div className="qty-cart">
                        <div className="quantity buttons_added">
                          <input type="button" defaultValue="-" className="minus minus-btn" />
                          <input type="number" step={1} name="quantity" defaultValue={1} className="input-text qty text" />
                          <input type="button" defaultValue="+" className="plus plus-btn" />
                        </div>
                        <span className="cart-icon"><i className="uil uil-shopping-cart-alt" /></span>
                      </div> */}
                    </div>
                  </div>
                </div>
               
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default Dcard
