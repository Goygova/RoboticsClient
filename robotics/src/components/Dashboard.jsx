import React from 'react';
import '../styles/Robots.style.css';
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Dashboard extends React.Component {
	render() {
		return (
			<div className='container'>
				<div className='robots-bar-container'>
					<h2 className='robots-bar-container-text'>Dashboard</h2>
				</div>
				<Divider />
				<div>
					<h3>Recent updates</h3>
				</div>
				<div>
					<List component='nav' aria-label='mailbox folders'>
						{this.props.app.history
							.filter(historyItem => historyItem.companyId === this.props.app.currentCompany.id)
							.sort((history, nextHistory) => nextHistory.date - history.date)
							.map(historyItem => {
								return (
									<div>
										<ListItem>
											<ListItemText primary={`${historyItem.robotName} ${historyItem.action}`} secondary={historyItem.getFormattedDate()} />
										</ListItem>
										<Divider />
									</div>
								);
							})}
					</List>
				</div>
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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
