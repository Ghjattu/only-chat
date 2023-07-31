import React from 'react';
import './NotificationModal.css';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListItem from '../ListItem/ListItem.js';
import List from '../List/List.js';

const NotificationModal = (props) => {
	const notificationList = props.notifications.map((notification) =>
		<ListItem
			key={notification.sender_id}
			avatar={notification.sender_username}
			primaryText={notification.sender_username}
		>
			<div className="button-group">
				<ButtonGroup variant='outlined' size='small'>
					<Button>Accept</Button>
					<Button>Reject</Button>
				</ButtonGroup>
			</div>
		</ListItem>
	);

	return (
		<Modal open={props.open} onClose={props.onClose} >
			<div className="notifications-wrapper">
				<List>
					{notificationList}
				</List>
			</div>
		</Modal>
	);
};

NotificationModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	notifications: PropTypes.arrayOf(PropTypes.shape({
		msg_type: PropTypes.number.isRequired,
		sender_id: PropTypes.number.isRequired,
		sender_username: PropTypes.string.isRequired,
		receiver_id: PropTypes.number.isRequired,
	})).isRequired,
};

export default NotificationModal;