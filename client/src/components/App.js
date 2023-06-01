import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
// the BrowserRouter uses it's own history object therefore we are now using a plain router to make sure that we are in charge of the history now
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamListSelf from './streams/StreamListSelf';
import history from '../history';

const App = () => {
	return (
		<div className="ui container">
			{/* passing in the history object that it uses our implementation of the history object */}
			<Router history={history}>
				<div>
					<Header />
					{/* we are importing switch as well to make sure that StreamCreate and StreamShow does not clash  */}
					<Switch>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/self" exact component={StreamListSelf} />
						<Route path="/streams/new" exact component={StreamCreate} />
						{/* a user can go to the edit page with the id now */}
						<Route path="/streams/edit/:id" exact component={StreamEdit} />
						<Route path="/streams/delete/:id" exact component={StreamDelete} />
						<Route path="/streams/:id" exact component={StreamShow} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
