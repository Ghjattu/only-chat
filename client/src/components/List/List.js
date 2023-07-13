import React from 'react';
import './List.css';
import PropTypes from 'prop-types';

const List = (props) => {
	return (
		<div className='list-wrapper'>
			<div className='list'>
				{props.children}
			</div>
		</div>
	);
};

List.propTypes = {
	children: PropTypes.node,
};

export default List;