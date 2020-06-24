import React from 'react';
import '../styles/todoItem.css';
import SessionsCompletedCounter from './SessionsCompletedCounter';
import { ReactComponent as Check } from '../icons/check.svg';
import { ReactComponent as Clock } from '../icons/clock.svg';

function TodoItem({ task, sessionsCompleted, isCompleted, startSession, toggleIsCompleted, expectedSessions }) {
	var sessionsRemaining = expectedSessions - sessionsCompleted;
	if (sessionsRemaining < 0) {
		sessionsRemaining = 0;
	}
	return (
		<div className="card todo-item-container">
			<div className="todo-item-container-left">
				<button onClick={toggleIsCompleted} type="button" className="todo-item-complete-button">
					{isCompleted ? (
						<div className="todo-item-circle todo-item-circle-check">
							<Check />
						</div>
					) : (
						<div className="todo-item-circle todo-item-circle-empty" />
					)}
				</button>
				<div>
					<div className="todo-item-task">{task}</div>
					<SessionsCompletedCounter
						sessionsCompleted={sessionsCompleted}
						sessionsRemaining={sessionsRemaining}
					/>
				</div>
			</div>
			<button type="button" onClick={startSession} className="todo-item-start-session-button">
				<Clock />
			</button>
		</div>
	);
}

export default TodoItem;
