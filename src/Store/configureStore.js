import { createStore, combineReducers } from 'redux';
import quizReducer from '../reducers/quizReducer';

const rootReducer = combineReducers({
  quiz: quizReducer
});

const store = createStore(rootReducer);

export default store;








// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk'; // If you're using Redux Thunk middleware
// import quizReducer from './reducers/quizReducer'; // Assuming you have a quizReducer

// const rootReducer = combineReducers({
//   quiz: quizReducer,
//   // Add other reducers here if needed
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;