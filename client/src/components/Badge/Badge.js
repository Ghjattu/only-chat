import React from 'react';
import './Badge.css';
import PropTypes from 'prop-types';

const Badge = (props) => {
	let { count, max } = props;

	if (count == 0) {
		return <></>;
	}

	if (max == undefined) {
		max = 99;
	}

	return (
		<div className='badge'>
			{count <= max ? count : max + '+'}
		</div>
	);
};

Badge.propTypes = {
	count: PropTypes.number.isRequired,
	max: PropTypes.number,
};

export default Badge;