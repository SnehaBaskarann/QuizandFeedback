// Action types
export const SET_QUIZ_DETAILS = 'SET_QUIZ_DETAILS';
export const FETCH_QUIZ_REQUEST = 'FETCH_QUIZ_REQUEST';
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';


export const fetchQuizByIdRequest = () => ({
    type: FETCH_QUIZ_REQUEST
});

export const fetchQuizByIdSuccess = editQuiz => ({
    type: FETCH_QUIZ_SUCCESS,
    payload:editQuiz
});

// Action Creators
export const setQuizDetails = quizDetails => ({
    type: SET_QUIZ_DETAILS,
    payload: quizDetails
});

export const setNameofQuiz = nameofquiz => ({
    type: 'SET_NAME_OF_QUIZ',
    payload: nameofquiz,
});

export const setDuration = duration => ({
    type: 'SET_DURATION',
    payload: duration,
});

export const setPassMark = passMark => ({
    type: 'SET_PassMark',
    payload: passMark,
});

export const setAttempts = attempts => ({
    type: 'SET_ATTEMPTS',
    payload: attempts,
});

export const setError = error => ({
    type: 'SET_ERROR',
    payload: error,
});












// export const createquiz = (quiz) => {
//     return async (dispatch) => {
//         dispatch({ type: 'CREATEQUIZ_REQUEST' });

//         try {
//             const response = await fetch('http://localhost:3001/quizzes', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(quiz),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 dispatch({ type: 'CREATEQUIZ_SUCCESS', payload: data });
//             } else {
//                 dispatch({ type: 'CREATEQUIZ_FAILURE', payload: data.error });
//             }
//         } catch (error) {
//             dispatch({ type: 'CREATEQUIZ_FAILURE', payload: error.message });
//         }
//     };
// };





// export const setQuizTitle = title => ({
//     type: 'SET_QUIZ_TITLE',
//     payload: title,
// });

// export const setDuration = duration => ({
//     type: 'SET_DURATION',
//     payload: duration,
// });

// export const setGrade = grade => ({
//     type: 'SET_GRADE',
//     payload: grade,
// });

// export const setAttempts = attempts => ({
//     type: 'SET_ATTEMPTS',
//     payload: attempts,
// });

// export const setError = error => ({
//     type: 'SET_ERROR',
//     payload: error,
// });

