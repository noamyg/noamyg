import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'tachyons';

import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';
import { requestCustomers, searchRobots } from './reducers'


const logger = createLogger();

const rootReducer = combineReducers({ requestCustomers, searchRobots});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
                <Provider store={store}>
                    <App/>
                </Provider>, document.getElementById('root')
                );
registerServiceWorker();
