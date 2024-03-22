import React, { useEffect, useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Meals from './Meals';
import ScrollableFeed from 'react-scrollable-feed'
import Menuinfo from './Menuinfo';
import { auth, db } from '../../../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import MealItemForm from './Meals/MealItemForm';
import StarIcon from '@mui/icons-material/Star';
import swal from '@sweetalert/with-react';
import Reviews from './Reviews'
const labels = {
  1: 'Negative+',
  2: 'Negative',
  3: 'Neutral',
  4: 'Positive',
  5: 'Positive+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


function Post({ category, description, electronicID, images, name, price }) {
    const [lgShow, setLgShow] = useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [see,setSee] = useState()
    const [posts2, setPosts2] = useState([])
    const cartCtx = useContext(CartContext);
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [comment, setComment] = useState('')
    const [countReviews, setCountReviews] = useState(0)
    const [posts3, setPosts3] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
      db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
        setUser(doc.data());
      });
  }, [])




    useEffect(() => {
      db.collection("electronics").doc(electronicID).collection("reviews").where("electronicID","==", electronicID)
     .onSnapshot(snapshot => (
      setCountReviews(snapshot.docs.length)
     ))
  }, []);

  useEffect(() => {
    db.collection('reviews').where("electronicID","==",electronicID).onSnapshot(snapshot => {
        setPosts3(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);



const submitReview = () => {
  if(value1 === 0){
      toast.error("Kindly rate the stars!")
  }else if(!comment){
   toast.error("Comment is required!")
}else{
   db.collection("electronics").doc(electronicID).collection("reviews").add({
       electronicID,
       ratedByName:`${user?.firstName} ${user?.lastName}`,
       ratedByPhone:`${user?.phone}`,
       ratedByUid:auth?.currentUser?.uid,
       rating:value1,
       ratingComment:comment,
       ratingTime: Date.now(),
   }).
   then((e)=> 
   setValue1(0),
   setComment(""),
   swal("Thanks for your feedback ✔️!")
   )
  }
}

    const addToCartHandler = amount => {
      cartCtx.addItem({
        id: electronicID,
        name,
        amount: amount,
        price,
        image:images[0].url,
        received:false,
      });
    };

    useEffect(() => {
      db.collection("electronics").doc(electronicID).collection('reviews').where("electronicID","==",electronicID).onSnapshot(snapshot => {
          setPosts2(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);

 const totalRatings = (posts2.reduce((a,v) =>  a = a + v.post.rating , 0 ))
 const numberOfRatings = posts2.length
 const rating2 = totalRatings / numberOfRatings
 var a = Math.round(rating2 * 1) / 1
 var b = posts2.length
    
    const likePost = () =>{
      // Alert.alert("Be Aware", "You liked the post!") 
      db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").where("fromId", "==", auth?.currentUser?.uid).where("electronicID", "==",electronicID ).get().then(
          snap => {
            if (snap.docs.length > 0) {
              db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(electronicID).delete().then(function() {
              }).catch(function(error) {
                  alert("Error removing post: ", error);
              });                
          
            } else {
              db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(electronicID).set({
                fromId: auth?.currentUser?.uid,
                electronicID,
                type:'electronic',
                timestamp:Date.now(),  
                liked:true,        
                })
                toast.success(`Marked product ${name} as favourite`)
            }
          }
        )
  }
  useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).collection("Favourites").doc(electronicID).onSnapshot((doc) => {
        setSee(doc.data());
    });
}, [])

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};
  

  return (
        <>
                      <div style={{marginLeft:5,border:'1px solid #88888888',padding:1,borderRadius:10}} className="list-card bg-white rounded overflow-hidden position-relative shadow-sm">
          <div className="list-card-image">
            <div className="star position-absolute"><span className="badge badge-success"><i className="icofont-star" />{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)} </span></div>
            <div className="favourite-heart text-danger position-absolute"><a>
            {auth?.currentUser?.uid ?(
                      <a className="woo_cart_btn btn_save">
                        {see?.liked === true ?(
                        <FavoriteIcon onClick={likePost} style={{color: '#e74c3c',backgroundColor:'#fff',borderRadius:10}}/>
                        ):(
                          <FavoriteBorderOutlinedIcon onClick={likePost} className="ti-heart" style={{color:'#e74c3c',backgroundColor:'#fff',borderRadius:10}}/>
                        )}
                        </a>
                      ):(
                        <li><a onClick={() => alert("Kindly sign In first.\nThanks!")} className="woo_cart_btn btn_save"><FavoriteBorderOutlinedIcon style={{color:'#e74c3c',backgroundColor:'#fff',borderRadius:10}} className="ti-heart" /></a></li>
                      )}
              </a></div>
            <a >
              <img src={images[0]?.url} style={{height:130,width:'100%',objectFit:'cover'}}  className="img-fluid item-img" />
            </a>
          </div>
          <div className="p-3 position-relative">
            <div className="list-card-body">
              <h6 className="mb-1"><a className="text-black">{name}</a></h6>
              <p className="text-gray mb-2">Ksh. {numberWithCommas(price)}</p>
              <p className="text-gray time mb-0">              
              <div className="quantity buttons_added">
              <MealItemForm id = {electronicID} onAddToCart={addToCartHandler} />
            </div>
                 <span className="float-right">
                   
                 <a href="javascript:void(0);" onClick={() => setLgShow(true)} className="woo_cart_btn btn_cart"><VisibilityOutlinedIcon style={{color:'#e74c3c'}} fontSize="medium" className="ti-eye"/></a>
                </span>
              </p>
            </div>
          </div>
        </div> 











        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton style={{position: 'sticky',top:0, zIndex:4, height:50}}>
          <Modal.Title id="example-modal-sizes-title-lg">

           {/* <center>Menu Details</center>  */}
           <ClearOutlinedIcon style={{cursor:'pointer'}} onClick={() => setLgShow(false)}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{
          height:'80vh',
          overflowY:'auto'
        }}
        >
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar style={{position: 'sticky',top:0, zIndex:4,width:'100%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          backgroundColor='#fff'
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{backgroundColor: '#fff'}}
        >
          <Tab label={`INFORMATION`} {...a11yProps(0)} />
          <Tab label={`RATES & REVIEWS (${b})`} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <ScrollableFeed>
          <Menuinfo images={images} price={price} category={category} description={description} electronicID={electronicID} name={name} a={a} numberOfRatings={numberOfRatings}/>
        </ScrollableFeed>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <ScrollableFeed>
         <Reviews electronicID={electronicID}/>
        </ScrollableFeed>
        </TabPanel>
      </SwipeableViews>
    </Box>
        </Modal.Body>



        {auth?.currentUser?.uid &&(
           <>
           {value === 1 &&(
            <Modal.Footer style={{display:'inline-block',display:'table',margin:'auto'}}>
            <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue1(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value1 !== null && (
              <Box sx={{ ml: 0 }} style={{fontSize:15}}>{labels[hover !== -1 ? hover : value1]}</Box>
            )}
          </Box>
            <div>
            <form style={{display:'flex',alignItems:'center'}}>
            <div className="form-group">
              <textarea className="form-control" style={{width:'100%'}} value={comment} onChange={e => setComment(e.target.value)}  placeholder={"Your Comment..."} />
            </div>
            <div className="form-group">
              <button style={{marginLeft:5}} onClick={submitReview} className="btn btn-primary btn-sm" type="button"> Submit Comment </button>
            </div>
          </form>
            </div>
         </Modal.Footer>
          )}
           </>
        )}
      </Modal>
        </> 


          
  )
}

export default Post
