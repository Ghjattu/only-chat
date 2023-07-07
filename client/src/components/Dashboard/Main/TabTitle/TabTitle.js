import React from 'react';
import './TabTitle.css';

const TabTitle = (props) => {
	return (
		<h1 className='tab-title'>{props.title}</h1>
	);
};

export default TabTitle;