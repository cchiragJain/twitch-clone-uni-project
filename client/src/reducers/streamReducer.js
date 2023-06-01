import _ from 'lodash';

import {
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			// the mapKeys function takes an array with objects and creates a new object with the passed in argument as the keys of the new objects
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			// see how we are not removing action.payload.id since the id is directly used in the payload of the action creator
			// omit is a function that will delete the record of action.payload from the state object
			return _.omit(state, action.payload);

		default:
			return state;
	}
};
