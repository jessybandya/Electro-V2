import React, { Component } from "react";
import Slider from "react-slick";

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


export default function MealImg({ mealImage }){

  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div>
        <Slider className="slider-image-meals-details-container" {...settings}>
          <div>
          <img src={mealImage} className="slider-image-meals-details img-fluid"/>
          </div>
          <div>
          <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg" className="slider-image-meals-details img-fluid"/>
          </div>
          <div>
          <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg" className="slider-image-meals-details img-fluid"/>
          </div>
          <div>
          <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg" className="slider-image-meals-details img-fluid" />
          </div>
        </Slider>
      </div>
    );
  
}