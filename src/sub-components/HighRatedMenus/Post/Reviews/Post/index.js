import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import { db,auth } from '../../../../../firebase';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


function Post({ ratedByUid, rating1, ratingComment, ratingTime, reviewId, eventId, ratedByName}) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <span style={{display:'flex',alignItems:'center',fontWeight:'bold'}}>
    {rating1}/5 ({status(rating1)})
    </span>,
  ];

  const [currentUser, setCurrentUser] = useState('')
  React.useEffect(() => {
    db.collection('users').doc(`${ratedByUid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

const deleteReview = () =>{
  if(window.confirm(`Are you sure you want to delete your review?`)){
      db.collection("electronics").doc(eventId).collection("reviews").doc(reviewId).delete().then(function() {
      }).catch(function(error) {
          toast.error("Error removing post: ", error);
      }); 
      toast.success("Review has been deleted!")   
    }
}

const reportReview = () => {
  alert("In progress...")
}

function status(x){
  if(x === 1){
    return(
      <span>Negative+</span>
    )
  }else if(x === 2){
    return(
      <span>Negative</span>
    )
  }else if(x === 3){
    return(
      <span>Neutral</span>
    )
  }else if(x === 4){
    return(
      <span>Postive</span>
    )
  }else if(x===5){
    return(
      <span>Positive+</span>
    )
  }else{
    return(
      <span>No review</span>
    )
  }
}


  return (
    <Comment
      actions={actions}
      author={<a>{currentUser?.firstName} {currentUser?.lastName}</a>}
      avatar={<Avatar {...stringAvatar(`${ratedByName}`)} />}
      content={
        <>
        {auth?.currentUser?.uid === ratedByUid ?(
          <p onClick={deleteReview} style={{cursor:'pointer'}}>
          {ratingComment}
        </p>
        ):(
          <p onClick={reportReview} style={{cursor:'pointer'}}>
          {ratingComment}
        </p>
        )}
        </>
      }
      datetime={
        <Tooltip title="2016-11-22 11:22:33">
          <span>{`${moment(ratingTime).fromNow()}`}</span>
        </Tooltip>
      }
    />
  )
}

export default Post