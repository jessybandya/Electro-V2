import React, { useEffect, useState } from 'react'
import Post from './Post'
import ReactPaginate from "react-paginate";
import Pagination from '@mui/material/Pagination';
import { db } from '../../../../firebase';


export default function Allmyarticles({ filteredPosts, searchTerm, userId }) {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [input, setInput] = useState("");
  
     useEffect(() => {
         db.collection('articles').where("ownerId", "==", userId).onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);
     const menusPerPage = 100;
     const pagesVisited = pageNumber * menusPerPage;

     const pageCount = Math.ceil(posts.length / menusPerPage);
     const changePage = ({ selected }) => {
       setPageNumber(selected);
     };

  return (
    <div style={{marginTop:10}}>
      {searchTerm === "" ?(
         posts?.length > 0 ?(
            <center style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
            {
                posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                   <Post
                   key={id} 
                   articleID={post.articleID}
                   description={post.description}
                   fileData={post.fileData}
                   fileType={post.fileType}
                   noLikes={post.noLikes}
                   ownerId={post.ownerId}
                   timestamp={post.timestamp}
                   title={post.title}
                   />
                 ))
 }
            </center>
         ):(
            <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
         )
      ):(
       <div>
       {
        filteredPosts.length > 0 ?(
          <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
          {
                          filteredPosts.map((posts2) => (

<Post 
articleID={posts2.articleID}
description={posts2.description}
fileData={posts2.fileData}
fileType={posts2.fileType}
noLikes={posts2.noLikes}
ownerId={posts2.ownerId}
timestamp={posts2.timestamp}
title={posts2.title}
/>
))
                          }
          </div>
        ):(
          <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
        )       
      
      }
       </div>
      )}
      <div>
      <center>


        
      </center>
     </div>
      
    </div>
    
   );

   
}