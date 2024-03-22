import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import datas from "../MenuCategory";


export default function SliderHeader () {


  const settings = {
      // dots: true,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
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
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          {datas.map((data, index) => {
            return(
              <div className="item">
              <div className="osahan-category-item">
                <Link to="/shopping">
                  <img className="img-fluid" src="https://dis-prod.assetful.loblaw.ca/content/dam/loblaw-companies-limited/creative-assets/shoppers-drug-mart/sdm-phx/digital/web/campaigns/2023/wk01/electronics/c-electronic-hero-slider-desktop-EN.png" alt="" />
                  <h6>{data.name}</h6>
                  <p></p>
                </Link>
              </div>
            </div>
            )
          })}

    {/* <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/2.png" alt="" />
          <h6>Pizza</h6>
          <p>120</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/3.png" alt="" />
          <h6>Healthy</h6>
          <p>130</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/4.png" alt="" />
          <h6>Vegetarian</h6>
          <p>120</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/5.png" alt="" />
          <h6>Chinese</h6>
          <p>111</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/6.png" alt="" />
          <h6>Hamburgers</h6>
          <p>958</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/7.png" alt="" />
          <h6>Dessert</h6>
          <p>56</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/8.png" alt="" />
          <h6>Chicken</h6>
          <p>40</p>
        </a>
      </div>
    </div>
    <div className="item">
      <div className="osahan-category-item">
        <Link to="/menu">
          <img className="img-fluid" src="img/list/9.png" alt="" />
          <h6>Indian</h6>
          <p>156</p>
        </a>
      </div>
      </div>           */}
        </Slider>
      </div>
    );
  }
