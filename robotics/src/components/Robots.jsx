import React from 'react';
import { connect } from 'react-redux';
import '../styles/Robots.style.css';

import { Divider, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import HistoryItemModel from '../models/HistoryItemModel';
import HistoryItemActionType from '../enums/HistoryItemActionType';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddRobotDrawer from './AddRobotDrawer';

class Robots extends React.Component {
	constructor() {
		super();
		this.state = {
			isDrawerOpen: false,
			confirmationModalOpen: false
		};
	}

	toggleDrawer() {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen
		});
	}

	addRobot(newRobot) {
		this.props.addRobot(newRobot);
		const historyItem = new HistoryItemModel(this.props.app.currentCompany.id, newRobot.name, HistoryItemActionType.ADD);
		this.props.addHistory(historyItem);
	}

	openConfirmationModal(robot) {
		this.setState({
			robotToRemove: robot,
			confirmationModalOpen: true
		});
	}

	closeConfirmationModal() {
		this.setState({
			confirmationModalOpen: false
		});
	}

	deleteRobot(robot) {
		this.props.deleteRobot(robot.robotId);
		const historyItem = new HistoryItemModel(robot.companyId, robot.name, HistoryItemActionType.DELETE);
		this.props.addHistory(historyItem);

		this.closeConfirmationModal();
	}

	render() {
		return (
			<div className='container'>
				<div className='robots-bar-container'>
					<h2 className='robots-bar-container-text'>Robots</h2>
					<div className='add-robot-button-container'>
						<Button variant='contained' color='primary' onClick={() => this.toggleDrawer()}>
							Add new Robot
						</Button>
					</div>
				</div>
				<Divider />
				<Table>
					<TableHead>
						<TableRow className='table-row-head'>
							{['Name', 'Location', 'Robot Id', ''].map((name, rowIndex) => {
								return <TableCell key={rowIndex}>{name}</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.app.robots
							.filter(robot => robot.companyId === this.props.app.currentCompany.id)
							.map(robot => (
								<TableRow key={robot.robotId} className='table-row-body'>
									<TableCell>{robot.name}</TableCell>
									<TableCell>{robot.location}</TableCell>
									<TableCell>{robot.robotId}</TableCell>
									<TableCell className='table-row-body__delete-icon-cell'>
										<IconButton onClick={() => this.openConfirmationModal(robot)}>
											<DeleteForeverIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>

				<AddRobotDrawer
					isDrawerOpen={this.state.isDrawerOpen}
					toggleDrawer={() => this.toggleDrawer()}
					addRobot={robot => this.addRobot(robot)}
					currentCompany={this.props.app.currentCompany}></AddRobotDrawer>

				<DeleteConfirmationModal
					isOpen={this.state.confirmationModalOpen}
					robot={this.state.robotToRemove}
					deleteRobot={robot => this.deleteRobot(robot)}
					closeModal={() => this.closeConfirmationModal()}></DeleteConfirmationModal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		app: state.appReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addRobot: robot => {
			dispatch({
				type: 'ADD_ROBOT',
				payload: robot
			});
		},
		addHistory: historyItem => {
			dispatch({
				type: 'UPDATE_HISTORY',
				payload: historyItem
			});
		},
		deleteRobot: robotId => {
			dispatch({
				type: 'DELETE_ROBOT',
				payload: robotId
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Robots);
