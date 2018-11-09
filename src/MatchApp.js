import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Router from './Router';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const MatchApp = props => (
    <Provider store={store}>
    	<Router />
    </Provider>
);

export default MatchApp;