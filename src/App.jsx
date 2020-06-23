import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.clearCompletedItems = this.clearCompletedItems.bind(this);
		this.startSession = this.startSession.bind(this);
		this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
		this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

		this.state = {
			items: [],
			nextItemId: 0,
			sessionIsRunning: false,
			itemIdRunning: null,
			areItemsMarkedAsCompleted: false,
			activeItem: null
		};
	}

	addItem(description) {
		const { nextItemId } = this.state;

		const newItem = {
			id: nextItemId,
			description: description,
			sessionsCompleted: 0,
			isCompleted: false
		};
		this.setState((prevState) => ({
			items: prevState.items.concat(newItem),
			nextItemId: prevState.nextItemId + 1
		}));
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
									description={item.description}
									sessionsCompleted={item.sessionsCompleted}
									isCompleted={item.isCompleted}
									startSession={() => this.startSession(item.id)}
									toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
								/>
							))}
						</div>
					) : (
						<EmptyState />
					)}
				</div>
				<footer>
					<TodoInput addItem={this.addItem} />
				</footer>
			</div>
		);
	}
}

export default App;
