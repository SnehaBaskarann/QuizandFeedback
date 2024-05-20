import axios from 'axios';
import { useState } from 'react';
import { fetchQuizByIdSuccess, fetchQuizByIdRequest } from '../actions/CreateQuizAction';

const createquiz = async (quizDetails) => {
  try {
    console.log("details", quizDetails);
    const response = await axios.post('http://localhost:5199/api/Quiz/22a43258-f99b-4b7b-98d9-40d5a3e09bc3', quizDetails);
  } catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
};

export const GetQuizDetails = async() =>{
  try {
    const response = await axios.get('http://localhost:5199/api/Quiz/22a43258-f99b-4b7b-98d9-40d5a3e09bc3');
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
}

export const PutQuizDetails = async(updatedQuizData) =>{
  try{
    const response = await axios.put('http://localhost:5199/api/Quiz/22a43258-f99b-4b7b-98d9-40d5a3e09bc3', updatedQuizData)
    console.log("Quiz edited successful",response.data);
  }catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
}


export const DeleteQuizDetails = async() =>{
  try{
    const response = await axios.delete('http://localhost:5199/api/Quiz/036f50d3-0c0c-4291-b510-f7e096d44f76')
    console.log("Quiz deleted successful",response.data);
  }catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
}
// export const getQuizById = () => async dispatch => {
//   dispatch(fetchQuizByIdRequest());
//   try {
//     const response = await axios.get('https://localhost:7005/api/Quiz/e256e8d7-2dc7-4bc9-a4c4-9eea0d3733b6');
//     dispatch(fetchQuizByIdSuccess(response.data));
//     console.log("quiz", response.data);

//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error.message;
//   }
// };





export { createquiz };