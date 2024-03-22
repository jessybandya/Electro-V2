import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Post from './Post';
import { db } from '../../../../firebase';

function Comments({ electronicID }) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection('electronics').doc(electronicID).collection("reviews").orderBy("ratingTime", "desc").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

  return (
    <div>
    {posts.length === 0 ?(
      <center style={{fontWeight:'bold'}}>No Reviews yet!</center>
    ):(
      <>
      {
        posts.map(({id, post}) => (
         <Post
         key={id} 
         ratedByUid={post?.ratedByUid}
         rating1={post?.rating}
         ratingComment={post?.ratingComment}
         ratingTime={post?.ratingTime}
         reviewId = {id}
         eventId={electronicID}
         ratedByName={post.ratedByName}
         />
        ) )
}
      </>
    )}
    </div>
  )
}

export default Comments