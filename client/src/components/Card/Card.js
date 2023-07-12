import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = (props) => {
	const { children } = props;

	return (
		<div className='card'>{children}</div>
	);
};

Card.propTypes = {
	children: PropTypes.node,
};

export default Card;