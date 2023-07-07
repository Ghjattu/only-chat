import React, { useState } from 'react';
import './StatusBar.css';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// icons theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#d82828',
		},
	},
});

const StatusBar = () => {
	// eslint-disable-next-line no-unused-vars
	const [msgCount, setMsgCount] = useState(0);

	return (
		<div className='statusbar-wrapper'>
			<ThemeProvider theme={theme}>
				<Badge badgeContent={msgCount} max={99} color='primary' className='badge'>
					<NotificationsNoneOutlinedIcon fontSize='small'/>
				</Badge>
			</ThemeProvider>
		</div>
	);
};

export default StatusBar;