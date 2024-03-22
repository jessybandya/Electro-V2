import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { db } from '../../../../firebase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CartContext from '../../../../store/cart-context';
import MealItemForm from './MealItemForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MealInfo from './MealInfo';

function Meals({ mealId, branchId, restId, menuId }) {
  const [meal, setMeal] = useState()
  const [modalShow, setModalShow] = React.useState(false);
	const cartCtx = useContext(CartContext);

	// const price = `$${props.price.toFixed(2)}`;


	const addToCartHandler = amount => {
		cartCtx.addItem({
			id: mealId,
			name: meal?.mealName,
      menuId:menuId,
			amount: amount,
			price: meal?.mealPrice,
      image: meal?.mealImage,
      branchId:branchId,
      restId:restId,
      received:false,
		});
	};
  useEffect(() => {
    db.collection('meals').doc(`${mealId}`).onSnapshot((doc) => {
      setMeal(doc.data());
    });
}, [])

  return (
    <>
    <div className="col-md-4 col-sm-6 mb-4">
<div style={{marginLeft:5, border:"1px solid #88888888",borderRadius:10}} className="item">
                  <div style={{padding:5}} className="">
                    <span className="">
                      <img src={meal?.mealImage} alt="" style={{width:"100%",borderRadius:5,height:130,objectFit:'cover'}}/>
                      <div className="product-absolute-options">
                        {/* <span className="offer-badge-1">New</span> */}
                      </div>
                    </span>
                    <div className="product-text-dt">
                    <h4>{meal?.mealName.substring(0,21)}</h4>
                      <div className="product-price">P {parseFloat(meal?.mealPrice).toFixed(2)}</div>
                      <div className="qty-cart">
                        <div className="quantity buttons_added">
                          {/* <input type="button" defaultValue="-" className="minus minus-btn" /> */}
                        <MealItemForm id = {mealId} onAddToCart = {addToCartHandler} />
                        </div>
                        <span onClick={() => setModalShow(true)} className="cart-icon"><VisibilityIcon className="uil uil-shopping-cart-alt" /></span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

              <Modal
             show={modalShow}
             onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title style={{alignContent:'center',justifyContent:'center'}} id="contained-modal-title-vcenter">
          <center style={{fontWeight:'bold'}}>{meal?.mealName}</center>
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <MealInfo mealId={mealId} onAddToCart = {addToCartHandler}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
              </>
  )
}

export default Meals