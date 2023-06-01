import streams from '../apis/streams';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
} from './types';
import history from '../history';

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

// most of the action creators that make api requests of any kind have the same kind of syntax as these ones and also the middleware is applied to them in main index.js file

// post posts the data to the api
// the thunk middleware actually calls in the function that we pass in here using another argument as well that is the getState which we can use to get our redux store state anytime
export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formValues, userId });

	dispatch({
		type: CREATE_STREAM,
		payload: response.data,
	});

	// we need to do some programmatic navigation here to make sure the user to go back to the route path
	history.push('/');
};

// get is how we get the data
export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');
	dispatch({
		type: FETCH_STREAMS,
		payload: response.data,
	});
};

export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);
	dispatch({
		type: FETCH_STREAM,
		payload: response.data,
	});
};

// put is used to completely update data on a server changing all existing values and deleting values if one doesn't exist any more ( does not affect the id property )
// patch only updates those values that are actually changed

// we are putting the new formValues here to the existing id
export const editStream = (id, formValues) => async dispatch => {
	// const response = await streams.put(`/streams/${id}`, formValues);
	const response = await streams.patch(`/streams/${id}`, formValues);
	dispatch({
		type: EDIT_STREAM,
		payload: response.data,
	});
	history.push('/');
};

// delete is used to delete data from a server
// there is not going to be any response in this case
export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);
	dispatch({
		type: DELETE_STREAM,
		payload: id,
	});
	history.push('/');
};
