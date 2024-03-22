import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../firebase';
import Post from './Post';

function ImagesList({albumId}) {
  const [posts, setPosts] = useState([])

   useEffect(() => {
       db.collection('electronics').where("electronicID","==",albumId).onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);

  return (
    <div>
    {
      posts.map(({id, post}) => (
         <Post
         key={id} 
         albumID={id}
         name={post?.name}
         images={post?.images}
         />
       ))
}
    </div>
  )
}

export default ImagesList