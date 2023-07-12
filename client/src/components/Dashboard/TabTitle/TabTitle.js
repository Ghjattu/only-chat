import React from 'react';
import PropTypes from 'prop-types';
import './TabTitle.css';

const TabTitle = (props) => {
	return (
		<h1 className='tab-title'>{props.title}</h1>
	);
};

TabTitle.propTypes = {
	title: PropTypes.string.isRequired,
};

export default TabTitle;