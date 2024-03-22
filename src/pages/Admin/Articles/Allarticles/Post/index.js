import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { db } from '../../../../../firebase';
import { Link } from "react-router-dom"
import { toast } from "react-toastify"


function Post({ electronicID, description, name, category, price, images, timestamp, sum }) {
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])

  useEffect(() => {
    db.collection("electronics").doc(electronicID).collection('reviews').where("electronicID","==",electronicID).onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
const numberOfRatings = posts.length
const rating2 = totalRatings / numberOfRatings
var a = Math.round(rating2 * 1) / 1
var b = posts.length

  // useEffect(() => {
  //   db.collection('articles').doc(articleId).collection("comments").onSnapshot((snapshot) => {
  //     setComments(snapshot.docs.map((doc) => doc.data()))
  //   })
  // }, [])

  // useEffect(() => {
  //   db.collection('articles').doc(articleId).collection("likes").onSnapshot((snapshot) => {
  //     setLikes(snapshot.docs.map((doc) => doc.data()))
  //   })
  // }, [])

  const deleteArticle = () =>{
    if(window.confirm(`Are you sure you want to delete this product:-> ${name}?`)){
        db.collection("electronics").doc(electronicID).delete().then(function() {
        }).catch(function(error) {
            toast.error("Error removing order: ", error);
        }); 
        toast.success(`Product ${electronicID} has been deleted successfully!`)   
      }
}

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);
  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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
      <span>N.R</span>
    )
  }
}

  
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell > 
        {name}         
        </TableCell>
        <TableCell align='right'> 
        {category}              
        </TableCell>
        <TableCell align='right'>
        {numberWithCommas(price)}                 
        </TableCell>
        <TableCell align='right'>
        {description}                  
        </TableCell>
        <TableCell align='center' style={{fontWeight:'bold'}}>
        <div>
        {sum > 0 ? <span>+{sum}</span> : sum === 0 ? <span>{sum}</span>: <span>{sum}</span>}
        </div>           
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon onClick={deleteArticle} style={{color:'#e74c3c',cursor:'pointer'}} fontSize='medium'/>                  
        </TableCell>
  </TableRow>
  )
}

export default Post