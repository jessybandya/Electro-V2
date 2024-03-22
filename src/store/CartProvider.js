import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: localStorage.getItem("Python")
    ? JSON.parse(localStorage.getItem("Python"))
    : [],
	totalAmount: localStorage.getItem("Python1")
    ? JSON.parse(localStorage.getItem("Python1"))
    : 0,
}
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
		window.localStorage.setItem('Python1', JSON.stringify(updatedTotalAmount));

		const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
			window.localStorage.setItem('Python', JSON.stringify(updatedItems));
		}
		else{
			updatedItems = state.items.concat(action.item);
			window.localStorage.setItem('Python', JSON.stringify(updatedItems));
		}
		return {
			items: updatedItems, 
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
		const existingItem = state.items[existingCartItemIndex];

		const UpdatedTotalAmount = state.totalAmount - existingItem.price;
		window.localStorage.setItem('Python1', JSON.stringify(UpdatedTotalAmount));
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
			window.localStorage.setItem('Python', JSON.stringify(updatedItems));
		}
		else {
			const updatedItem = {...existingItem, amount: existingItem.amount - 1};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
			window.localStorage.setItem('Python', JSON.stringify(updatedItems));
		}

		return {
			items: updatedItems,
			totalAmount: UpdatedTotalAmount,
		};
	}

	if (action.type === 'CLEAR') {
		return defaultCartState;
	}

	return defaultCartState;
};

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = item => {
		dispatchCartAction({type: 'ADD', item: item});
	};

	const removeItemFromCartHandler = id => {
		dispatchCartAction({type: 'REMOVE', id: id});
	};

	const clearCartHandler = () => {
		dispatchCartAction({type: 'CLEAR'});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler 
	};

	return (
		<CartContext.Provider value = {cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;