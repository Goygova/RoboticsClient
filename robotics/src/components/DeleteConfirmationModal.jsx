import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import '../styles/DeleteConfirmationModal.styles.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default class DeleteConfirmationModal extends React.Component {
	render() {
		if (this.props.robot) {
			return (
				<Modal open={this.props.isOpen} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
					<div className='modal__body'>
						<div className='modal__header'>
							<h2 id='simple-modal-title'>Remove {this.props.robot.name}.</h2>
							<div className='drawer-header__close-button'>
								<IconButton aria-label='delete' onClick={() => this.props.closeModal()}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<p id='simple-modal-description'>This will remove {this.props.robot.name} from its job.</p>
						<Button
							className='modal__confirm-button'
							variant='contained'
							color='primary'
							onClick={() => this.props.deleteRobot(this.props.robot)}>
							Confirm
						</Button>
					</div>
				</Modal>
			);
		}
		return '';
	}
}
