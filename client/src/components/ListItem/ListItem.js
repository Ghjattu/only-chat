import React from 'react';
import './ListItem.css';
import Avatar from 'boring-avatars';
import PropTypes from 'prop-types';

const ListItem = (props) => {
	const handleClick = () => {
		if (typeof props.handleListItemClick === 'function') {
			props.handleListItemClick();
		}
	};

	return (
		<div className='list-item' onClick={handleClick}>
			<div className="avatar">
				<Avatar
					size={40}
					name={props.avatar}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
			</div>

			<div className="primary-text">
				{props.primaryText}
			</div>

			<div className="secondary-text">
				{props.secondaryText}
			</div>

			{props.children}
		</div>
	);
};

ListItem.propTypes = {
	avatar: PropTypes.string.isRequired,
	primaryText: PropTypes.string.isRequired,
	secondaryText: PropTypes.string,
	handleListItemClick: PropTypes.func,
	children: PropTypes.node,
};

export default ListItem;