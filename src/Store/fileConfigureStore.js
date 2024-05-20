import { createStore } from 'redux';
import fileReducer from '../reducers/fileReducer';

const store = createStore(
  fileReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
