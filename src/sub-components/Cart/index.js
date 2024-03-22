import React, {useContext, useState} from 'react';

// import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
// import { db } from '../Meals/MealItem/firebase'
import { db } from '../../firebase';


const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `P ${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = item => {
		cartCtx.addItem({...item, amount: 1});
	};
	

	const orderHandler = () => {
		setIsCheckout(true);
	};
  console.log("Items: ",cartCtx.items)
	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
        console.log("User: ",userData.name)

		db.child("orders").push({
			name : userData.name,
			street: userData.street,
			city: userData.city,
			// postalCode: userData.enteredPostalCode,
			timestamp:Date.now(),
			totalAmount,
			orderedItems: cartCtx.items,
		  }).catch(alert);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (<ul>
        {cartCtx.items.length > 0 ?(
                        cartCtx.items.map(item => (
                            <CartItem 
                                key = {item.id}
                                name = {item.name} 
                                amount = {item.amount} 
                                price = {item.price} 
                                image = {item.image}
								tPrice={item.tPrice}
								received={item.received}
                                onRemove = {cartItemRemoveHandler.bind(null, item.id)} 
                                onAdd = {cartItemAddHandler.bind(null, item)} 
                            />
                        ))
        ):(
         <center style={{fontWeight:'bold',color:'#88888888'}}>Your Cart is empty</center>
        )}

	</ul>);

	const modalActions = (
		<div>
			<button  onClick = {props.onCloseCart}>Close</button>
			{hasItems && <button  onClick = {orderHandler}>Order</button>}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div >
				<span style={{color: "#cc5500"}}>Total Amount</span>
				<span style={{color: "#cc5500"}}>{totalAmount}</span>
			</div>
			{/* {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel = {props.onCloseCart} />}
			{!isCheckout && modalActions} */}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>; 
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div>
				<button  onClick = {props.onCloseCart}>Close</button>
			</div>		
		</React.Fragment>
	);	

	return (
        <React.Fragment>
             {cartItems}
        {/* {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel = {props.onCloseCart} />}
        {!isCheckout && modalActions} */}
    </React.Fragment>
	);
};

export default Cart;