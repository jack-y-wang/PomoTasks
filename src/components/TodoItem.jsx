import React from 'react';
import '../styles/todoItem.css';
import SessionsCompletedCounter from './SessionsCompletedCounter';
import { ReactComponent as Check } from '../icons/check.svg';
import { ReactComponent as Clock } from '../icons/clock.svg';
import { Icon } from 'semantic-ui-react';

function TodoItem({
	id,
	task,
	description,
	sessionsCompleted,
	isCompleted,
	startSession,
	toggleIsCompleted,
	expectedSessions,
	itemIdRunning
}) {
	var sessionsRemaining = expectedSessions - sessionsCompleted;
	return (
		<div className="card todo-item-container">
			<div className="todo-item-container-left">
				<button type="button" className="todo-item-complete-button">
					{isCompleted ? (
						<div onClick={toggleIsCompleted} className="todo-item-circle todo-item-circle-check">
							<Check />
						</div>
					) : (
						<div onClick={toggleIsCompleted} className="todo-item-circle todo-item-circle-empty" />
					)}
				</button>
				<div className="task-info" onClick={startSession}>
					<div className="todo-item-task">{task}</div>
					<SessionsCompletedCounter
						sessionsCompleted={sessionsCompleted}
						sessionsRemaining={sessionsRemaining}
					/>
					{description !== '' && (
						<div className="todo-item-note-container">
							<p>{description}</p>
						</div>
					)}
				</div>
			</div>

			{/* <div>
				<Icon name="ellipsis vertical" />
			</div> */}
			{id === itemIdRunning ? <div className="active-item-bar" /> : <div className="item-bar" />}
		</div>
	);
}

export default TodoItem;
