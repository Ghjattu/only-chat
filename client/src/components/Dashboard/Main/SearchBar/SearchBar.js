import React, { useState } from 'react';
import './SearchBar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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

const SearchBar = () => {
	const [iconColor, setIconColor] = useState('secondary');
	const [searchText, setSearchText] = useState('');

	const handleFocus = () => {
		setIconColor('primary');
	};

	const handleBlur = () => {
		setIconColor('secondary');
	};

	const handleChange = (e) => {
		setSearchText(e.target.value);
	};

	return (
		<div className='search-bar-wrapper'>
			<ThemeProvider theme={theme}>
				<SearchOutlinedIcon color={iconColor} />
			</ThemeProvider>
			<input className='search-bar' type='text' placeholder='Search' value={searchText}
				onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}>
			</input>
		</div>
	);
};

export default SearchBar;