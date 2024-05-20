// reducers/CreateQuizReducer.js
import { FETCH_QUIZ_SUCCESS, SET_QUIZ_DETAILS } from "../actions/CreateQuizAction";
import { FETCH_QUIZ_REQUEST } from "../actions/CreateQuizAction";
const initialState = {

    nameofquiz: '',
    duration: '',
    passMark: '',
    attemptsAllowed: '',
    error: '',
};

const initialEditQuiz = {
    nameofquiz: '',
    duration: '',
    passMark: '',
    attemptsAllowed: '',
}

export function editQuizReducer(state = initialEditQuiz, action) {
    switch (action.type) {
        case FETCH_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload,
                error: null
            };
        default:
            return state;
    }
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {


        case SET_QUIZ_DETAILS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

