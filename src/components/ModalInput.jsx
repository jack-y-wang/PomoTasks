import React from 'react';
import ReactModal from 'react-modal';
import { Button, Icon } from 'semantic-ui-react';
import '../styles/Modal.css';
ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.51)';

export default class ModalInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numPomodoros: 1,
			todoItemValue: '',
			itemDescription: '',
			addButtonActive: false,
			showNote: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.taskChange = this.taskChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.showNoteField = this.showNoteField.bind(this);
	}

	componentDidMount() {
		ReactModal.setAppElement('body');
	}

	taskChange(e) {
		const todoItemValue = e.target.value;
		this.setState({ todoItemValue: todoItemValue });
	}

	handleChange(e) {
		let nam = e.target.name;
		let val = e.target.value;
		let addButtonActive = this.state.addButtonActive;
		if (nam === 'todoItemValue') {
			if (val !== '') {
				addButtonActive = true;
			}
		}
		this.setState({
			[nam]: val,
			addButtonActive
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { addItem } = this.props;
		const { todoItemValue, numPomodoros, itemDescription } = this.state;
		if (todoItemValue !== '') {
			addItem(todoItemValue, numPomodoros, itemDescription);
			this.setState({
				numPomodoros: 1,
				todoItemValue: '',
				itemDescription: '',
				showNote: false,
				addButtonActive: false
			});
		}
	}

	handleClose() {
		const { handleCloseModal } = this.props;
		this.setState({
			numPomodoros: 1,
			todoItemValue: '',
			itemDescription: '',
			addButtonActive: false,
			showNote: false
		});
		handleCloseModal();
	}

	showNoteField() {
		this.setState({
			showNote: true
		});
	}

	increment(e) {
		this.setState((prevState) => ({
			numPomodoros: parseInt(prevState.numPomodoros) + 1
		}));
	}

	decrement() {
		this.setState((prevState) => ({
			numPomodoros: prevState.numPomodoros < 2 ? 1 : parseInt(prevState.numPomodoros) - 1
		}));
	}

	render() {
		const { numPomodoros, todoItemValue, addButtonActive, showNote, itemDescription } = this.state;
		return (
			<ReactModal
				isOpen={this.props.showModal}
				contentLabel="Modal #1 Global Style Override Example"
				onRequestClose={this.props.handleCloseModal}
				className="modal-outer-container"
			>
				<form onSubmit={this.handleSubmit}>
					<div className="modal-inner-container">
						<div className="modal-input-container task">
							<input
								name="todoItemValue"
								placeholder="Add Task..."
								value={todoItemValue}
								onChange={this.handleChange}
								className="modal-todo-input"
								autoFocus
							/>
						</div>

						<h4 className="modal-heading">Est. Number of Pomodoros </h4>
						<div className="modal-input-container number">
							<input
								name="numPomodoros"
								onChange={this.handleChange}
								value={numPomodoros}
								className="modal-todo-input"
								type="number"
								min={0}
								// step={1}
							/>
							<Icon
								name="caret up"
								circular
								onClick={this.increment}
								icon={<i className="button-icon" />}
							/>
							<Icon
								name="caret down"
								circular
								onClick={this.decrement}
								icon={<i className="button-icon" />}
							/>
						</div>

						{!showNote && (
							<h4 className="modal-heading show-note" onClick={this.showNoteField}>
								+ Add Notes{' '}
							</h4>
						)}
						{showNote && (
							<div className="modal-input-container note">
								<textarea
									name="itemDescription"
									placeholder="Some notes..."
									value={itemDescription}
									onChange={this.handleChange}
									className="modal-todo-input"
									autoFocus
								/>
							</div>
						)}
					</div>
					<div className="modal-footer">
						<Button
							primary
							floated="right"
							color="grey"
							disabled={!addButtonActive}
							onClick={this.handleSubmit}
						>
							Add
						</Button>
						<Button floated="right" onClick={this.handleClose}>
							Cancel
						</Button>
					</div>
				</form>
			</ReactModal>
		);
	}
}
