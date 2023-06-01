import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamListSelf extends React.Component {
	renderAdmin(stream) {
		return (
			<div className="right floated content">
				<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
					Edit
				</Link>
				<Link
					to={`/streams/delete/${stream.id}`}
					className="ui button negative"
				>
					Delete
				</Link>
			</div>
		);
	}

	renderCreateButton() {
		return (
			<div style={{ textAlign: 'right' }}>
				<Link to="/streams/new" className="ui button primary">
					Create New Stream
				</Link>
			</div>
		);
	}

	renderList() {
		const filteredList = this.props.streams.filter(
			stream => stream.userId === this.props.currentUserId
		);
		return filteredList.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	render() {
		if (this.props.streams.length === 0) {
			return (
				<div>
					Please create a new Stream
					{this.renderCreateButton()}
				</div>
			);
		}
		return (
			<>
				<h2>My Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreateButton()}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
	};
};

export default connect(mapStateToProps)(StreamListSelf);
