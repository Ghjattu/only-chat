import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// icons theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#348ee9',
		},
		secondary: {
			main: '#616161',
		},
	},
});

const Menu = (props) => {
	const className = 'sidebar-menu-item';
	const classNameActive = 'sidebar-menu-item active';

	const { tabIndex, handleTabChange } = props;

	// tabs switch
	const handleClick = (index) => {
		handleTabChange(index);
	};

	return (
		<div className='sidebar-menu'>
			<div className={tabIndex === 0 ? classNameActive : className} onClick={() => handleClick(0)}>
				<ThemeProvider theme={theme}>
					<ChatBubbleOutlineIcon color={tabIndex === 0 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>chat</p>
			</div>

			<div className={tabIndex === 1 ? classNameActive : className} onClick={() => handleClick(1)}>
				<ThemeProvider theme={theme}>
					<PersonOutlineOutlinedIcon color={tabIndex === 1 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>friends</p>
			</div>

			<div className={tabIndex === 2 ? classNameActive : className} onClick={() => handleClick(2)}>
				<ThemeProvider theme={theme}>
					<ExploreOutlinedIcon color={tabIndex === 2 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>discover</p>
			</div>

			<div className={tabIndex === 3 ? classNameActive : className} onClick={() => handleClick(2)}>
				<ThemeProvider theme={theme}>
					<SettingsOutlinedIcon color={tabIndex === 3 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>settings</p>
			</div>
		</div>
	);
};

Menu.propTypes = {
	tabIndex: PropTypes.number.isRequired,
	handleTabChange: PropTypes.func.isRequired,
};

export default Menu;
