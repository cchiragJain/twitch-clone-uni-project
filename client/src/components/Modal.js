import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
	// this takes in two arguments first is some jsx that we want to show on the screen
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className="ui dimmer modals visible active">
			{/* we added stopPropagation to solve event bubbling issues */}
			<div
				onClick={event => event.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header">{props.title}</div>
				<div className="content">{props.content}</div>
				<div className="actions">{props.actions}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
