import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FriendInfo.css';
import Avatar from 'boring-avatars';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// icons theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#348ee9',
		},
		secondary: {
			main: '#868686',
		},
	},
});

const FriendInfo = (props) => {
	const [iconColor, setIconColor] = useState('secondary');

	const handleMouseEnter = () => { 
		setIconColor('primary');
	};

	const handleMouseLeave = () => { 
		setIconColor('secondary');
	};

	const handleClick = () => { 
		props.handleTabChange(0);
	};

	return (
		<div className='friend-info-wrapper'>
			<div className='friend-info'>
				<Avatar
					size={60}
					name={props.friend.username}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
				<div className='content'>
					<p className='content-username'>{props.friend.username}</p>
					<p className='content-chatid'>Chat ID:&nbsp;{props.friend.chatid}</p>
				</div>
			</div>

			<div className='to-chat' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
				onClick={handleClick}>
				<ThemeProvider theme={theme}>
					<MapsUgcOutlinedIcon sx={{ fontSize:40 }} color={iconColor} />
				</ThemeProvider>
			</div>
		</div>
	);
};

FriendInfo.propTypes = {
	friend: PropTypes.shape({
		username: PropTypes.string.isRequired,
		chatid: PropTypes.string.isRequired,
	}),
	handleTabChange: PropTypes.func.isRequired,
};

export default FriendInfo;