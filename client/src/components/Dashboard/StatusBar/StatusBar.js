import React, { useEffect, useState } from 'react';
import './StatusBar.css';
import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotificationModal from '../../NotificationModal/NotificationModal.js';

// icons theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#d82828',
		},
	},
});

const StatusBar = (props) => {
	const [unreadCount, setUnreadCount] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalOpen = () => setModalOpen(true);
	const handleModalClose = () => setModalOpen(false);

	useEffect(() => {
		// Count unread notifications.
		const count = props.notifications.reduce((acc, cur) => {
			if (!cur.have_processed) {
				return acc + 1;
			}
			return acc;
		}, 0);
		setUnreadCount(count);
	}, [props.notifications]);

	return (
		<div className='statusbar-wrapper'>
			<div onClick={handleModalOpen} className='badge-wrapper'>
				<ThemeProvider theme={theme}>
					<Badge badgeContent={unreadCount} max={99} color='primary' >
						<NotificationsNoneOutlinedIcon fontSize='small'/>
					</Badge>
				</ThemeProvider>
			</div>

			<NotificationModal
				open={modalOpen}
				onClose={handleModalClose}
				notifications={props.notifications}
			/>
		</div>
	);
};

StatusBar.propTypes = {
	notifications: PropTypes.arrayOf(PropTypes.shape({
		ID: PropTypes.number.isRequired,
		msg_type: PropTypes.number.isRequired,
		sender_id: PropTypes.number.isRequired,
		sender_username: PropTypes.string.isRequired,
		receiver_id: PropTypes.number.isRequired,
		timestamp: PropTypes.string.isRequired,
		have_read: PropTypes.bool.isRequired,
		have_processed: PropTypes.bool.isRequired,
	})).isRequired,
};

export default StatusBar;