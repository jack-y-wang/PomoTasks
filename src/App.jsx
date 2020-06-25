import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';
import ModalInput from './components/ModalInput';

import { Button, Icon } from 'semantic-ui-react';

import './styles/App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.addItemPressed = this.addItemPressed.bind(this);
		this.clearCompletedItems = this.clearCompletedItems.bind(this);
		this.startSession = this.startSession.bind(this);
		this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
		this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.state = {
			items: [],
			nextItemId: 0,
			sessionIsRunning: false,
			itemIdRunning: null,
			areItemsMarkedAsCompleted: false,
			activeItem: null,
			showModal: false,
			sessionIdRunning: null
		};
	}

	addItem(task, expectedPomodoros, description) {
		const { nextItemId } = this.state;

		const newItem = {
			id: nextItemId,
			task: task,
			description: description,
			sessionsCompleted: 0,
			isCompleted: false,
			expectedSessions: expectedPomodoros
		};
		this.setState((prevState) => ({
			items: prevState.items.concat(newItem),
			nextItemId: prevState.nextItemId + 1,
			showModal: false
		}));
	}

	addItemPressed() {
		this.setState({
			showModal: true
		});
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	clearCompletedItems() {
		this.resetTimer();

		this.setState({
			items: this.state.items.filter((item) => item.isCompleted === false),
			areItemsMarkedAsCompleted: false
		});
	}

	resetTimer() {
		let items = [ ...this.state.items ];
		let isTimer = false;
		items.forEach((item) => {
			if (item.isCompleted && item.id === this.state.itemIdRunning) {
				isTimer = true;
			}
		});

		if (isTimer) {
			this.setState({
				sessionIsRunning: false,
				itemIdRunning: null
			});
		}
	}

	increaseSessionsCompleted(itemId) {
		let items = [ ...this.state.items ];
		items.forEach((item) => {
			if (item.id === itemId) {
				item.sessionsCompleted += 1;
			}
		});
		this.setState({
			items: items
		});
	}

	toggleItemIsCompleted(itemId) {
		let items = [ ...this.state.items ];
		let areItemsMarkedAsCompleted = false;
		items.forEach((item) => {
			if (item.id === itemId) {
				item.isCompleted = !item.isCompleted;
			}
		});

		items.forEach((item) => {
			if (item.isCompleted) {
				areItemsMarkedAsCompleted = true;
			}
		});

		this.setState({
			items: items,
			areItemsMarkedAsCompleted: areItemsMarkedAsCompleted
		});
	}

	startSession(id) {
		let runningItem = null;
		let items = [ ...this.state.items ];
		items.forEach((item) => {
			if (item.id === id) {
				runningItem = item;
			}
		});
		this.setState({
			sessionIsRunning: true,
			itemIdRunning: id,
			activeItem: runningItem
		});
	}

	render() {
		const { items, sessionIsRunning, itemIdRunning, areItemsMarkedAsCompleted, activeItem } = this.state;
		return (
			<div className="flex-wrapper">
				<div className="container">
					<header>
						<h1 className="heading">What are we doing today?</h1>
						{areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
					</header>
					{sessionIsRunning && (
						<Timer
							mode="WORK"
							onSessionComplete={() => {
								this.increaseSessionsCompleted(itemIdRunning);
							}}
							task={activeItem}
							autoPlays={false}
						/>
					)}
					{this.state.items.length > 0 ? (
						<div className="items-container">
							{items.map((item) => (
								<TodoItem
									key={item.id}
									id={item.id}
									task={item.task}
									description={item.description}
									expectedSessions={item.expectedSessions}
									sessionsCompleted={item.sessionsCompleted}
									isCompleted={item.isCompleted}
									startSession={() => this.startSession(item.id)}
									toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
									itemIdRunning={this.state.itemIdRunning}
								/>
							))}
						</div>
					) : (
						<EmptyState />
					)}
				</div>
				<footer>
					<Button fluid onClick={this.addItemPressed}>
						<Icon name="add" />
						Add Task
					</Button>
					{/* <TodoInput addItem={this.addItemPressed} /> */}
					<ModalInput
						showModal={this.state.showModal}
						handleCloseModal={this.handleCloseModal}
						addItem={this.addItem}
					/>
				</footer>
			</div>
		);
	}
}

export default App;
