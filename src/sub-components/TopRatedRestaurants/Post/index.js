import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';


function Post({ branchImg, branchName, status, closingTime, openingTime, branchAddress, restaurant, branchId }) {
  const [posts2, setPosts2] = useState([])
  const [see,setSee] = useState()

  useEffect(() => {
    db.collection('branches').doc(branchId).collection("reviews").onSnapshot(snapshot => {
        setPosts2(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

const totalRatings = (posts2.reduce((a,v) =>  a = a + v.post.rating , 0 ))
const numberOfRatings = posts2.length
const rating2 = totalRatings / numberOfRatings
var a = Math.round(rating2 * 10) / 10


const likePost = () =>{
  // Alert.alert("Be Aware", "You liked the post!") 
  db.collection("users").doc(auth?.currentUser?.uid).collection("FavouritesRestaurants").where("fromId", "==", auth?.currentUser?.uid).where("branchId", "==",branchId ).get().then(
      snap => {
        if (snap.docs.length > 0) {
          db.collection("users").doc(auth?.currentUser?.uid).collection("FavouritesRestaurants").doc(branchId).delete().then(function() {
          }).catch(function(error) {
              alert("Error removing post: ", error);
          });                
      
        } else {
          db.collection("users").doc(auth?.currentUser?.uid).collection("FavouritesRestaurants").doc(branchId).set({
            fromId: auth?.currentUser?.uid,
            branchId,
            type:'restaurants',
            branchId,
            timestamp:Date.now(),  
            liked:true,
            branchImg,  
            branchName,  
            status,
            closingTime,
            openingTime,
            restaurant,            
            })
            toast.success("Marked this restaurant as favourite")
        }
      }
    )
}

useEffect(() => {
db.collection('users').doc(`${auth?.currentUser?.uid}`).collection("FavouritesRestaurants").doc(branchId).onSnapshot((doc) => {
    setSee(doc.data());
});
}, [])

  return (
    <>
    {/* {a > 3.5 &&( */}
    <div className='box'>
    <div style={{marginLeft:5, border:'1px solid #fff'}} className="list-card bg-white rounded overflow-hidden position-relative shadow-sm ">
    <div  className="list-card-image">
    <div className="star position-absolute">
      <span className="badge badge-success"><i className="icofont-star" />{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}
      </span>
    </div>
    <div className="favourite-heart text-danger position-absolute">
    {auth?.currentUser?.uid ?(
                          <span><a className="woo_cart_btn btn_save">
                            {see?.liked === true ?(
                            <FavoriteIcon onClick={likePost} style={{color: '#e74c3c'}}/>
                            ):(
                              <FavoriteBorderOutlinedIcon onClick={likePost} className="ti-heart" />
                            )}
                            </a></span>
                          ):(
                            <span><a onClick={() => alert("Kindly sign In first.\nThanks!")} className="woo_cart_btn btn_save"><FavoriteBorderOutlinedIcon className="ti-heart" /></a></span>
                          )}
      </div>
    <div className="member-plan position-absolute"><span className="badge badge-dark">{status}</span></div>
    <Link to={`/branchdetails/${branchId}`}>
      <img src={branchImg} style={{height:130,width:'100%',objectFit:'cover'}} className="img-fluid item-img" />
    </Link>
    </div>
    <div className="p-3 position-relative">
    <div className="list-card-body">
      <h6 className="mb-1">
        <span className="text-black">{branchName.substring(0,21)}
        </span>
        </h6>
      <p className="text-gray mb-3">
      <Rating style={{cursor:'pointer'}} name="half-rating-read" value={a} precision={0.5} readOnly />
        </p>
      <p className="text-gray mb-3 time"><span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i className="icofont-wall-clock" /> {openingTime}–{closingTime}</span> 
      <span className="float-right text-black-50">{restaurant.substring(0,21)}
      </span>
      </p>
    </div>
    
    </div>
    </div>
    </div>
    {/* )} */}

</>
  )
}

export default Post