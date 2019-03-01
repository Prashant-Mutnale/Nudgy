import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storeReducer from './reducers'
import logger from 'redux-logger'
import promise from 'redux-promise'
const middlewares = [thunk, promise];
const store = createStore(storeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(
    applyMiddleware(...middlewares,
        logger
    ),
));

export default store;