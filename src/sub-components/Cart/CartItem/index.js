import React, { useState } from 'react'

const CartItem = (props) => {
  const [amountCount, setAmountCount] = useState(props.amount)

  const setAmountToZero = () =>{
    amountCount = props.amount
    amountCount = 0
  }
  function addZeroes(num) {
    return num.toFixed(Math.max(((num+'').split(".")[1]||"").length, 2));
 }
 function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

  return (
    <div className="">
            <li >
            <div className="cart-item">
                <div className="cart-product-img">
                  <img src={props.image} alt={props.name}/>
                  {/* <div className="offer-badge">6% OFF</div> */}
                </div>
                <div className="cart-text">
                  <h4>{props.name}</h4>
                  <div className="cart-radio">

                  </div>
                  <div className="qty-group">
                    <div className="quantity buttons_added">
                      <input type="button" onClick={props.onRemove} defaultValue="-" className="minus minus-btn" />
                      <span style={{padding:10,marginTop:5}}>{props.amount}</span>
                      <input type="button" onClick={props.onAdd} defaultValue="+" className="plus plus-btn" />
                    </div>
                    <div className="cart-item-price">Ksh. {numberWithCommas(parseFloat(props.price).toFixed(2))} </div>
                  </div>
                  <div style={{marginTop:10}} className="cart-item-price">Total: Ksh. {numberWithCommas(parseFloat(props.price * props.amount).toFixed(2))}</div>
                </div>
              </div>
    </li>
    <hr/>
    </div>
  )
}

export default CartItem