import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../../firebase';
import Modal1 from '../Modal1'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CartContext from '../../../../store/cart-context';
import MealItemForm from '../Meals/MealItemForm';
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function Menuinfo({ images, price, category, description, electronicID, name, a,numberOfRatings }) {
    const [branch, setBranch] = useState()
    const [menu, setMenu] = useState()
    const [res, setRes] = useState()
    const [creator, setCreator] = useState()
    const cartCtx = useContext(CartContext);


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

//     useEffect(() => {
//       db.collection('branches').doc(`${branchId}`).onSnapshot((doc) => {
//         setBranch(doc.data());
//       });
//   }, [])
//   useEffect(() => {
//     db.collection('menus').doc(`${menuId}`).onSnapshot((doc) => {
//         setMenu(doc.data());
//     });
// }, [])
// useEffect(() => {
//     db.collection('restaurants').doc(`${restId}`).onSnapshot((doc) => {
//         setRes(doc.data());
//     });
// }, [])

// useEffect(() => {
//     db.collection('traders').doc(`${createdById}`).onSnapshot((doc) => {
//         setCreator(doc.data());
//     });
// }, [])

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
    <div>
               <div>
            <div className="modal-body">
            <div className="row align-items-center">
                
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="">
                {/* <img src={mealImage} style={{objectFit:'contain'}} className="img-fluid" alt="" /> */}
                <Modal1 mealImage={images} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="woo_pr_detail">
                  <div className="woo_cats_wrps">
                    <a href="#" className="woo_pr_cats">{name}</a>
                    <span className="woo_pr_trending" style={{fontWeight:'bold',backgroundColor:'#e74c3c',color:'#fff'}}>
                        Ksh. {numberWithCommas(price)}
                    </span>
                  </div>
                   <h6 className="woo_pr_title">{description}</h6>

                  <Paper sx={{ width: '100%',marginTop:5 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
          <TableRow>
          <TableCell >
                   <span style={{fontWeight:'bold',color:'#e74c3c'}}>Category</span> 
              </TableCell>
              <TableCell >
              {category}
              </TableCell>
          </TableRow>

          <TableRow>
          <TableCell >
                   <span style={{fontWeight:'bold',color:'#e74c3c'}}>Rating</span> 
              </TableCell>
              <TableCell >
              {numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5
              </TableCell>
          </TableRow>

          <TableRow>              
          <TableCell >
                   <span style={{fontWeight:'bold',color:'#e74c3c'}}>Rating Comment</span> 
              </TableCell>
              <TableCell >
                    {status(a)}
              </TableCell>
          </TableRow>

          <TableRow>              
          <TableCell >
                   <span style={{fontWeight:'bold',color:'#e74c3c'}}>Shop</span> 
              </TableCell>
              <TableCell >
              <div className="quantity buttons_added">
              <MealItemForm id = {electronicID} onAddToCart={addToCartHandler} />
            </div>
              </TableCell>
          </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
                </div>
              </div>
            </div>
          </div>

            </div> 
    </div>
  )
}

export default Menuinfo