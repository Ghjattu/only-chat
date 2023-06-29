import React, { useState } from 'react';
import './Menu.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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

const Menu = () => {
	// tabs switch
	const [tabIndex, setTabIndex] = useState(0);
    
	const handleClick = (index) => { 
		setTabIndex(index);
        
		const menuItems = document.querySelectorAll('.sidebar-menu-item');

		for (let i = 0; i < menuItems.length; i++) {
			menuItems[i].classList.remove('active');
		}
		menuItems[index].classList.add('active');
	};

	return (
		<div className='sidebar-menu'>
			<div className='sidebar-menu-item active' onClick={() => handleClick(0)}>
				<ThemeProvider theme={theme}>
					<ChatBubbleOutlineIcon color={tabIndex === 0 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>chat</p>
			</div>
			<div className='sidebar-menu-item' onClick={() => handleClick(1)}>
				<ThemeProvider theme={theme}>
					<PeopleAltOutlinedIcon color={tabIndex === 1 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>friends</p>
			</div>
			<div className='sidebar-menu-item' onClick={() => handleClick(2)}>
				<ThemeProvider theme={theme}>
					<SettingsOutlinedIcon color={tabIndex === 2 ? 'primary' : 'secondary'} fontSize='20'/>
				</ThemeProvider>
				<p>settings</p>
			</div>
		</div>
	);
};

export default Menu;
