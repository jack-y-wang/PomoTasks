import React from 'react';
import '../styles/sessionsCompletedCounter.css';

function SessionsCompletedCounter({ sessionsCompleted, sessionsRemaining }) {
	return (
		<div className="sessions-completed-container">
			{/* using index as a key is an anti-pattern but should not matter for this case
        https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318 */}
			{sessionsRemaining >= 0 ? (
				[ ...Array(sessionsCompleted) ]
					.map((_, index) => <div className="sessions-line completed" key={index} />)
					.concat(
						[ ...Array(sessionsRemaining) ].map((_, index) => (
							<div className="sessions-line remaining" key={index} />
						))
					)
			) : (
				[ ...Array(sessionsCompleted + sessionsRemaining) ]
					.map((_, index) => <div className="sessions-line completed" key={index} />)
					.concat(
						[ ...Array(Math.abs(sessionsRemaining)) ].map((_, index) => (
							<div className="sessions-line additional" key={index} />
						))
					)
			)}
		</div>
	);
}

export default SessionsCompletedCounter;
