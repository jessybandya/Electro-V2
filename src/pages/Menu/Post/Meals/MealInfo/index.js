import React, { useEffect, useState, useRef } from 'react'
import { db } from '../../../../../firebase';
import MealImg from './MealImg'
import swal from '@sweetalert/with-react';
import { toast } from 'react-toastify';
import Input from '../Input';


const MealInfo = (props) => {
    const [meal, setMeal] = useState()
    const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (enteredAmount > 10
			
		) {
			swal("Please enter a valid amount (1-10).")
			return;
		}
		props.onAddToCart(enteredAmountNumber);
		toast.success(`Added to cart: ${enteredAmount} item(s)`)
	};

    useEffect(() => {
        db.collection('meals').doc(`${props?.mealId}`).onSnapshot((doc) => {
            setMeal(doc.data());
        });
    }, [])
  return (
          <div  className="row">
            <div  className="col-lg-12">
              <div style={{border:'2px solid #88888888',borderRadius:10}} className="product-dt-view">
                <div className="row">
                    <center><MealImg mealImage={meal?.mealImage}/></center>
                  <div className="col-lg-8 col-md-8">
                    <div className="product-dt-right">
                      <h2>{meal?.mealName}</h2>
                      {/* <div className="no-stock">
                        <p className="pd-no">Product No.<span>12345</span></p>
                        <p className="stock-qty">Available<span>(Instock)</span></p>
                      </div> */}
                      {/* <div className="product-radio">
                        <ul className="product-now">
                          <li>
                            <input type="radio" id="p1" name="product1" />
                            <label htmlFor="p1">500g</label>
                          </li>
                          <li>
                            <input type="radio" id="p2" name="product1" />
                            <label htmlFor="p2">1kg</label>
                          </li>
                          <li>
                            <input type="radio" id="p3" name="product1" />
                            <label htmlFor="p3">2kg</label>
                          </li>
                          <li>
                            <input type="radio" id="p4" name="product1" />
                            <label htmlFor="p4">3kg</label>
                          </li>
                        </ul>
                      </div> */}
                      <p className="pp-descp">
                          {meal?.mealDesc}
                          </p>
                          <p>
                          <ul style={{display:'flex',alignItems:'center'}}>
                          <li><div className="main-price color-discount">Price<span>P {parseFloat(meal?.mealPrice).toFixed(2)}</span></div></li>
                          {/* <li><div className="main-price mrp-price">MRP Price<span>$18</span></div></li> */}
                          <li style={{width:90,backgroundColor:'#f55d2c',height:41,padding:4,borderRadius:5,marginLeft:30}}>
 		<form style={{display: "flex",justifyContent: "space-between",alignContent: "center",alignItems: "center"}} onSubmit = {submitHandler} >
			<Input
                style={{color:'#f55d2c'}}
				ref = {amountInputRef}
				label = "Amount" 
				input = {{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '10',
					step: '1',
					defaultValue: '1'
				}} 
			/>	
            <span onClick={submitHandler} className="cart-icon"> <i className="uil uil-shopping-cart-alt" style={{fontSize:20,color:'#fff'}}/> </span> 
		</form>
                          </li>
                        </ul>         
                          </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default MealInfo