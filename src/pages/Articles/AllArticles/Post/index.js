import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth, db } from '../../../../firebase';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useParams, Link } from "react-router-dom"
import {Button, Modal} from 'react-bootstrap';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Backdrop from '@mui/material/Backdrop';

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    backgroundColor: '#FFFFFF',
    marginLeft:4,
    border:'solid 2px #D1D1D1'
  },
  media: {
    height: 120,
    objectFit:'contain',
    borderRadius:10
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function Post({ articleID, description, fileData, fileType, noLikes, ownerId, timestamp, title}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [commentCount, setCommentsCount] = React.useState(0)
    const [currentUser, setCurrentUser] = React.useState()
    const [countLikes, setCountLikes] = React.useState(0)
    const [see,setSee] = React.useState()
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
      setOpen2(false);
    };
    const handleToggle = () => {
      setOpen2(true);
    };

    const likePost = () =>{
      // Alert.alert("Be Aware", "You liked the post!") 
      db.collection("articles").doc(articleID).collection("likes").where("fromId", "==", auth?.currentUser?.uid).where("articleId", "==",articleID ).get().then(
          snap => {
            if (snap.docs.length > 0) {
              db.collection("articles").doc(articleID).collection("likes").doc(auth?.currentUser?.uid).delete().then(function() {
              }).catch(function(error) {
                  alert("Error removing post: ", error);
              });                
          
            } else {
              db.collection("articles").doc(articleID).collection("likes").doc(auth?.currentUser?.uid).set({
                    fromId: auth?.currentUser?.uid,
                    ownerId,
                    articleId:articleID,
                    timestamp:Date.now(),  
                    liked:true,          
                })
            }
          }
        )
  }

  React.useEffect(() => {
    db.collection('articles').doc(articleID).collection("likes").where("liked","==", true)
   .onSnapshot(snapshot => (
    setCountLikes(snapshot.docs.length)
   ))
}, []);

React.useEffect(() => {
    db.collection('articles').doc(`${articleID}`).collection("likes").doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
        setSee(doc.data());
    });
}, [])

    React.useEffect(() => {
      db.collection('users').doc(`${ownerId}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
  }, [])


  var d = timestamp;
//var d =val.timestamp;

//NB: use + before variable name
var date = new Date(+d)

React.useEffect(() => {
  db.collection('articles').doc(articleID).collection("comments")
 .onSnapshot(snapshot => (
  setCommentsCount(snapshot.docs.length)
 ))
}, []);

function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ "K", "M", "B", "T" ];

  // Go through the array backwards, so we do the largest first
  for (var i=abbrev.length-1; i>=0; i--) {

      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10,(i+1)*3);

      // If the number is bigger or equal do the abbreviation
      if(size <= number) {
           // Here, we multiply by decPlaces, round, and then divide by decPlaces.
           // This gives us nice rounding to a particular decimal place.
           number = Math.round(number*decPlaces/size)/decPlaces;

           // Add the letter for the abbreviation
           number += abbrev[i];

           // We are done... stop
           break;
      }
  }

  return number;
}
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={currentUser?.profilePhoto} aria-label="recipe" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${currentUser?.firstName} ${currentUser?.lastName}`}
        subheader={`${moment(timestamp).fromNow()}`}
      />
      {fileType === "image" ?(
        <>
        {fileData === "" ?(
          <CardMedia
          component="img"
          className={classes.media}
          image="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg"
          title={title}
        />
        ):(
          <CardMedia
          component="img"
          style={{borderRadius:18}}
          className={classes.media}
          image={fileData}
          title={title}
        />
        )}
      </>
      ): fileType === "video" ?(
        <CardMedia
        component="video"
        className={classes.media}
        image={fileData}
        title={title}
        controls
      />
      ):(
        <CardMedia
        component="img"
        className={classes.media}
        image="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg"
        title={title}
      />
      )}

      <CardContent style={{cursor:'pointer'}}>
      <Link to={`/article/true/${articleID}/${ownerId}`} >
      <Typography variant="body2" style={{fontWeight:'bold'}} color="textSecondary" component="p">
      {title.length > 35 ?(
        <>
        {title.substring(0, 35)}<span style={{fontWeight:'bold'}}>...more</span>
        </>
      ):(
        <>
        {title.substring(0, 35)}
        </>
      )}
      </Typography>
      </Link>
      </CardContent>
      <CardActions style={{justifyContent:'space-between'}}>
        <IconButton aria-label="add to favorites">
        {auth?.currentUser?.uid ?(
            <>
            {see?.liked === true ?(
              <ThumbUpIcon style={{color:'#43a047'}} onClick={likePost}/> 
             ):(
              <ThumbUpOutlinedIcon onClick={likePost}/> 
             )}   
            </>
        ):( <ThumbUpOutlinedIcon onClick={() => alert("Kindly Sign In first!")}/> )}      
          <span style={{fontSize:15}}>{abbrNum(countLikes, 1)}</span>
        </IconButton>
        <Link to={`/article/true/${articleID}/${ownerId}`} >
        <IconButton aria-label="share">
          <InsertCommentIcon /> <span style={{fontSize:15}}>{abbrNum(commentCount, 1)}</span>
        </IconButton>
        </Link>
        <IconButton
          aria-label="show more"
        >
          <ShareIcon onClick={handleToggle}/>
        </IconButton>
      </CardActions>



      
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open2}
      onClick={handleClose2}
    >
      <div style={{display: "flex",padding:10,justifyContent:"space-between",width:250,backgroundColor:"#fff",borderRadius:40}}>
 
      <div>
        <EmailShareButton
         title={`${title}`}
         url={`https://engineering-ebesa.web.app/article/true/${articleID}/${ownerId}`}
         hashtag={"#ebesa_articles"}
         description={`${description}`}
       >
         <EmailIcon  size={32} round />
       </EmailShareButton>
        </div>
 
        <div>
        <FacebookShareButton
        title={`${title}`}
        url={`https://engineering-ebesa.web.app/article/true/${articleID}/${ownerId}`}
        hashtag={"#ebesa_articles"}
        description={`${description}`}
        className=""
       >
         <FacebookIcon size={32} round />
       </FacebookShareButton>
        </div>
        <div>
        <TwitterShareButton
        title={`${title}`}
        url={`https://engineering-ebesa.web.app/article/true/${articleID}/${ownerId}`}
        hashtag={"#ebesa_articles"}
        description={`${description}`}
        >
         <TwitterIcon size={32} round />
       </TwitterShareButton>
        </div>
        <div>
        <WhatsappShareButton
        title={`${title}`}
        url={`https://engineering-ebesa.web.app/article/true/${articleID}/${ownerId}`}
        hashtag={"#ebesa_articles"}
        description={`${description}`}
        >
         <WhatsappIcon size={32} round />
       </WhatsappShareButton>
        </div>
 
               <div>
        <LinkedinShareButton
        title={`${title}`}
        url={`https://engineering-ebesa.web.app/article/true/${articleID}/${ownerId}`}
        hashtag={"#ebesa_articles"}
        description={`${description}`}
        >
         <LinkedinIcon size={32} round />
       </LinkedinShareButton>
        </div>  
 
      </div>
    </Backdrop>
    </Card>
   );
}