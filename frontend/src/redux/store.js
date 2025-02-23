import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import fileReducer from './reducers/fileReducer';

const rootReducer = combineReducers({
  file: fileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;