import React from 'react';
import './Button.css';

const Button = ({ label }) => {
	return (
		<div className='button-wrapper'>
			<button className='submit-button' type='submit'>{label}</button>
		</div>
	);
};

export default Button;