import React from 'react';
import ReactModal from 'react-modal';
import { Button } from 'semantic-ui-react';
import '../styles/Modal.css';
ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.51)';

export default class ModalInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numPomodoros: 1,
			todoItemValue: '',
			addButtonActive: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.taskChange = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
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
		e.preventDefault(); // use it for any and all forms with custom submit behavior
		const { addItem } = this.props;
		const { todoItemValue, numPomodoros } = this.state;
		if (todoItemValue !== '') {
			addItem(todoItemValue);
			this.setState({
				numPomodoros: 1,
				todoItemValue: ''
			});
		}
	}

	handleClose() {
		const { handleCloseModal } = this.props;
		handleCloseModal();
	}

	render() {
		const { todoItemValue, addButtonActive } = this.state;
		return (
			<ReactModal
				isOpen={this.props.showModal}
				contentLabel="Modal #1 Global Style Override Example"
				onRequestClose={this.props.handleCloseModal}
				className="modal-outer-container"
			>
				<div className="modal-inner-container">
					<div className="modal-input-container">
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
					<div className="modal-input-container">
						<input
							name="numPomodoros"
							placeholder="1"
							onChange={this.handleChange}
							className="modal-todo-input"
							type="number"
						/>
						<Button icon="caret up" />
						<Button icon="caret down" />
					</div>
				</div>
				<div className="modal-footer">
					<Button floated="right" color="grey" disabled={!addButtonActive} onClick={this.handleSubmit}>
						Add
					</Button>
					<Button floated="right" onClick={this.handleClose}>
						Cancel
					</Button>
				</div>
			</ReactModal>
		);
	}
}
