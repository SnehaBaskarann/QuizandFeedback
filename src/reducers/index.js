// reducers/index.js
// import { combineReducers} from 'react-redux';
// import quizReducer from './CreateQuizReducer';
import { combineReducers } from 'redux';
import quizReducer from './CreateQuizReducer';
import { editQuizReducer } from './CreateQuizReducer';
import questionReducer from './GetAllQuestionReducers';

const rootReducer = combineReducers({
  // quiz:rootReducer
  quiz:quizReducer,
  questions: questionReducer,
  editQuiz:editQuizReducer
  // // ... other reducers ...
});

export default rootReducer;
