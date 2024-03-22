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
import Sentiment from 'sentiment';
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


function Post({ category, description, electronicID, images, name, price, timestamp, sum }) {
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
   if(!comment){
   toast.error("Comment is required!")
}else{
  const sentimentAnalyzer = new Sentiment();
  // Perform sentiment analysis
  const result = sentimentAnalyzer.analyze(comment);
  const finalValue = result.score

   db.collection("electronics").doc(electronicID).collection("reviews").add({
       electronicID,
       ratedByName:`${user?.firstName} ${user?.lastName}`,
       ratedByPhone:`${user?.phone}`,
       ratedByUid:auth?.currentUser?.uid,
       rating:finalValue,
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
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                      <div style={{marginLeft:5,border:'1px solid #88888888',padding:1,borderRadius:10}} className="list-card bg-white rounded overflow-hidden position-relative shadow-sm">
          <div className="list-card-image">
            <div className="star position-absolute">{sum > 0 ? <span className="badge badge-success">+{sum}</span>: sum === 0 ? <span style={{background:'orange'}} className="badge">{sum}</span>: <span style={{background:'red'}} className="badge">{sum}</span>}</div>
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
        </div> 


          
  )
}

export default Post
