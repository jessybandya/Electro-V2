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


export default class Modal1 extends Component {

  
  render() {
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
      <div style={{padding:15}}>
        <Slider {...settings}>
        {this.props.mealImage.map(room => {
          return (
            <div className="rooms_slider">
                <img src={room.url} className="img-fluid" />  
            </div>
          );
        })}          
        </Slider>
      </div>
    );
  }
}