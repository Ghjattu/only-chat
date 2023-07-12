import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const SearchBar = (props) => {
	const [iconColor, setIconColor] = useState('secondary');
	const [searchText, setSearchText] = useState('');
	const [timeoutID, setTimeoutID] = useState(null);

	const handleFocus = () => {
		setIconColor('primary');
	};
	const handleBlur = () => {
		setIconColor('secondary');
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchText(value);

		clearTimeout(timeoutID);

		const newTimeoutID = setTimeout(() => { 
			props.handleSearch(value);        
		}, 200);

		setTimeoutID(newTimeoutID);
	};

	return (
		<div className='search-bar-wrapper'>
			<ThemeProvider theme={theme}>
				<SearchOutlinedIcon color={iconColor} />
			</ThemeProvider>
			<input className='search-bar' type='text' placeholder='Search' value={searchText} id='search'
				onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}>
			</input>
		</div>
	);
};

SearchBar.propTypes = {
	handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;