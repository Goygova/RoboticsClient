import React from 'react';
import Button from '@material-ui/core/Button';
import '../styles/AddRobotDrawer.styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import RobotModel from '../models/RobotModel';
import IconButton from '@material-ui/core/IconButton';

export default class AddRobotDrawer extends React.Component {
	constructor() {
		super();
		this.state = {
			newRobot: new RobotModel(),
			buttonIsDisabled: true
		};
	}

	handleInputChange(event) {
		this.setState({
			newRobot: {
				...this.state.newRobot,
				[event.target.name]: event.target.value,
				companyId: this.props.currentCompany.id
			}
		});
		if (event.target.name === 'robotId') {
			this.setState({
				buttonIsDisabled: !event.target.value
			});
		}
	}

	addRobot(robot) {
		this.props.addRobot(robot);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			newRobot: new RobotModel(),
			buttonIsDisabled: true
		});
	}

	render() {
		return (
			<Drawer anchor='right' open={this.props.isDrawerOpen}>
				<div className='drawer-header'>
					<h2>Add New Robot</h2>
					<div className='drawer-header__close-button'>
						<IconButton aria-label='delete' onClick={() => this.props.toggleDrawer()}>
							<CloseIcon />
						</IconButton>
					</div>
				</div>

				<form noValidate autoComplete='off' className='add-robot-form'>
					<div className='add-robot-form__field-container'>
						<TextField
							name='name'
							label='Robot name'
							value={this.state.newRobot.name}
							margin='dense'
							className='add-robot-field'
							variant='outlined'
							onChange={e => this.handleInputChange(e)}
						/>
					</div>
					<div className='add-robot-form__field-container'>
						<FormControl variant='outlined' className='add-robot-field' margin='dense'>
							<InputLabel>Location</InputLabel>
							<Select name='location' value={this.state.newRobot.location} onChange={e => this.handleInputChange(e)}>
								<MenuItem value={'San Francisco'}>San Francisco</MenuItem>
								<MenuItem value={'New York'}>New York</MenuItem>
								<MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className='add-robot-form__field-container'>
						<TextField
							required
							name='robotId'
							label='Robot Id'
							value={this.state.newRobot.robotId}
							margin='dense'
							className='add-robot-field'
							variant='outlined'
							onChange={e => this.handleInputChange(e)}
						/>
					</div>
				</form>

				<div className='add-robot-form__buttons-container'>
					<Button variant='outlined' color='secondary' onClick={() => this.resetForm()}>
						Cancel
					</Button>
					<Button
						disabled={this.state.buttonIsDisabled}
						variant='contained'
						color='primary'
						onClick={() => this.addRobot(this.state.newRobot)}>
						Add Robot
					</Button>
				</div>
			</Drawer>
		);
	}
}
