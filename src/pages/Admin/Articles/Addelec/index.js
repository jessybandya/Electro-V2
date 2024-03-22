import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Chip, Paper, Divider, LinearProgress } from "@material-ui/core";
import imageCompression from "browser-image-compression";
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import Styles from "./Style";
import swal from "@sweetalert/with-react";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { db, storage, auth } from "../../../../firebase";
import SoftButton from "../../../../components/SoftButton";
import { Space, Spin } from 'antd';


import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, Select } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const theme = createTheme();




const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const AddArticle = () => {
  const classes = Styles();
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const electronicID = db.collection('electronics').doc().id

  const addElectronic = () => {
    setLoading(true)
    if(!name){
        swal("Name field is required😕!"); 
        setLoading(false) 
    }else if(!price){
        swal("Price field is required😕!");  
        setLoading(false) 
    }else if(!category){
        swal("Category field is required😕!");  
        setLoading(false) 
    }else if(!description){
        swal("Description field is required😕!"); 
        setLoading(false)  
    }else{
            // uploading to collection called posts
    db.collection('electronics').doc(electronicID).set({
        electronicID,
        timestamp: Date.now(),
        description,
        name,
        category,
        price,
        images:[]
      })
      .then(() => 
      swal("✔️ successfully uploaded an electronic, give it image(s)!"),
      setDescription(""),
      setName(""),
      setPrice(""),
      setCategory(""),
      setExpanded(false),
      history(`/add-images/true/${electronicID}`)
      );
    }
  }

  return (
    <Paper style={{backgroundColor: "#E8E8E8"}} className={classes.upload}>
      <div className={classes.upload__header}>
        <div className={classes.header__form}  style={{cursor: "pointer"}}>          

        <SoftButton
        component="a"
        target="_blank"
        rel="noreferrer"
        variant="gradient"
        color="info"
        fullWidth
        onClick={handleExpandClick}
      >
      Post Elecronic
      </SoftButton>
      
        </div>
      </div>



<Collapse in={expanded} timeout="auto" unmountOnExit>
<ThemeProvider theme={theme}>
<Container component="main" maxWidth="xs">
  <CssBaseline />
  <Box
    sx={{
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box noValidate sx={{ mt: 3, mb:5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            autoComplete="given-name"
            label="Name"
            value={name}
            onChange={(e) => {
                setName(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price(Ksh)"
            value={price}
            onChange={(e) => {
                setPrice(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
  MenuProps={{
    style: {zIndex: 2001}
}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    sx={{ height: 50}}
    label="Category"
    onChange={handleChangeCategory}
  >
    <MenuItem value="">Category</MenuItem>
    <MenuItem value="Mobile">Mobile</MenuItem>
    <MenuItem value="Wearables">Wearables</MenuItem>
    <MenuItem value="TVs">TVs</MenuItem>
    <MenuItem value="Laptops">Laptops</MenuItem>
    <MenuItem value="Printers">Printers</MenuItem>
    <MenuItem value="Scanners">Scanners</MenuItem>
    <MenuItem value="Tablets">Tablets</MenuItem>
    <MenuItem value="Monitors">Monitors</MenuItem>
    <MenuItem value="Computers">Computers</MenuItem>
    <MenuItem value="White Goods">White Goods</MenuItem>
    <MenuItem value="Top Boxes">Top Boxes</MenuItem>
  </Select>
</FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Description"
            value={description}
            onChange={(e) => {
                setDescription(e.target.value)
            }}
          />
        </Grid>
      </Grid>

      <Button
      style={{marginTop:20,backgroundColor:'#e74c3c',color:'#fff',fontWeight:'bold'}}
        type="submit"
        fullWidth
        variant="contained"
        onClick={addElectronic}
      >
      {loading === true ?(
        <span><span style={{color:'#fff'}}>adding an electronic...<Spin size="middle" /></span></span>
      ):(
        <span>Add Electronic</span>
      )}
      </Button>

    </Box>
  </Box>
</Container>
</ThemeProvider>
    </Collapse>

    </Paper>
    
  );
};

export default AddArticle;