import React from 'react';
// import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
	return (
		<div>
			<input {...props.input} ref = {ref} style={{width:50,border:'1px solid #88888888',borderRadius:2,padding:2}}/>
		</div>
	);
});

export default Input;