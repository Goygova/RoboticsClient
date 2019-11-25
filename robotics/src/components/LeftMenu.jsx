import React from 'react';
import '../styles/LeftMenu.styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import AndroidIcon from '@material-ui/icons/Android';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HouseIcon from '@material-ui/icons/House';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';

function LeftMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const selectCompany = company => {
		setAnchorEl(null);
		props.setCompany(company);
	};
	return (
		<Drawer variant='permanent' anchor='left' classes={{ paper: 'drawer-container' }}>
			<div className='logo-container'>
				<img src='./assets/Pepper_Icon.png' alt='logo' />
			</div>
			<Divider />
			<div className='left-menu-company-dropdown__button-container'>
				<Button size='small' onClick={handleClick}>
					<span className='left-menu-company-dropdown__button-text'>{props.app.currentCompany.name}</span>

					<ArrowDownwardIcon fontSize='default' />
				</Button>

				<Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
					{props.app.companies.map(company => {
						return (
							<MenuItem key={company.id} onClick={() => selectCompany(company)}>
								{company.name}
							</MenuItem>
						);
					})}
				</Menu>
			</div>
			<Divider />
			<List>
				<Link to={'/dashboard'} className='left-menu-item-link'>
					<HouseIcon className='left-menu-item__icon' />
					<ListItemText primary={'Dashboard'} />
				</Link>

				<Link to={'/robots'} className='left-menu-item-link'>
					<AndroidIcon className='left-menu-item__icon' />
					<ListItemText primary={'Robots'} />
				</Link>
			</List>
			<Divider />
		</Drawer>
	);
}

const mapStateToProps = state => {
	return {
		app: state.appReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setCompany: company => {
			dispatch({
				type: 'SET_COMPANY',
				payload: company
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
