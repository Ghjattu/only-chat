import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ label }) => {
	return (
		<div className='button-wrapper'>
			<button className='submit-button' type='submit'>{label}</button>
		</div>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
};

export default Button;