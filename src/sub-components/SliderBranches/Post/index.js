import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

function Post({ branchImg, branchName, status, closingTime, openingTime, branchAddress, restaurant, branchId  }) {
    const value = 4.5;
  return (
      <>
      <Link to={`/branchDetails/${branchId}`}>
      <div className="item">
    <div className="offer_item">
      <div className="offer_item_thumb">
        <div className="offer-overlay" />
        <img src="assets/img/offer-1.jpg" alt="" />
      </div>
      <div className="offer_caption">
        <div className="offer_bottom_caption">
          <p>{openingTime} - {closingTime}</p>
          <div className="offer_title">{branchName}</div>
          <span>{branchAddress}</span>
        </div>
        <a href="#" style={{backgroundColor:'#fff'}} className="btn offer_box_btn">
        <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
        </a>
      </div>
    </div>
  </div>
      </Link>

  </>
  )
}

export default Post