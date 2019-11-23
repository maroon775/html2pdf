import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

let middleware = applyMiddleware(thunk);
if (process.env.NODE_ENV !== 'production') {
    middleware = require('redux-devtools-extension').composeWithDevTools(middleware);
}
export default createStore(reducer,  middleware);
