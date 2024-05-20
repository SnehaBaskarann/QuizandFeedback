import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizEditorView from './View/QuizEditorView';
import CreateQuizView from './View/CreateQuizView';
import QuizEditor from './components/QuizEditor';
import { QuestionTemplate } from './components/QuizComponents/QuestionTemplate';
import { Provider } from 'react-redux';
// import store from './store/configureStore'; 
import store from './Store/fileConfigureStore';
import UploadBulkQuiz from './components/QuizComponents/UploadBulkQuiz';
import CoursePage from "./components/QuizComponents/CoursePage";
import './App.css'
import './styles/CoursePage.css'
import './styles/CreateQuiz.css'
import QuestionTemplateView from './View/QuestionTemplateView';


function App() {
  return (
      <Routes>
        <Route path="/quiz" element={<QuizEditor />} />
        <Route path="/course" element={<CoursePage/>}/>
        <Route path="/" element={<CreateQuizView/>}/>  
        <Route path='/questiontemplate' element={<QuestionTemplateView/>}/>
        <Route path='/upload' element={
          <Provider store={store}>
            <div>
              <UploadBulkQuiz />
      
            </div>
          </Provider>
        } />


      </Routes>
  )};
export default App;



















// import './App.css';
// import {Routes, Route} from 'react-router-dom'
// import QuizEditorView from './view/QuizEditorView';


// function App() {
//   return (
//     <div className="App">
//      <Routes>
//         <Route path="quizEditorview" element={<QuizEditorView/>} /> 
//       </Routes>
//     </div>
    
//   );
// }
// export default App;
























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;