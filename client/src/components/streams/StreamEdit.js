import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		// console.log(this.props);
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		if (
			!this.props.auth ||
			this.props.currentUserId !== this.props.stream.userId
		) {
			return <div>Please login with your account</div>;
		}
		return (
			<div>
				<h3>Edit a Stream</h3>
				<StreamForm
					initialValues={{
						title: this.props.stream.title,
						description: this.props.stream.description,
					}}
					// initialValues={this.props.stream}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

// ownProps helps us to get the props from the main component
const mapStateToProps = (state, ownProps) => {
	// const id = ownProps.match.params.id;
	return {
		stream: state.streams[ownProps.match.params.id],
		auth: state.auth.isSignedIn,
		currentUserId: state.auth.userId,
	};
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
