import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field
						name="title"
						component={this.renderInput}
						label="Enter title"
					/>
					<Field
						name="description"
						component={this.renderInput}
						label="Enter description"
					/>
					<button className="ui primary button">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = formValue => {
	// these errors will be somehow magically(due to redux form) be there inside the component part in the Field component
	const errors = {};
	if (!formValue.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValue.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
