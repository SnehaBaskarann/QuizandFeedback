import CreateQuiz from "../components/QuizComponents/CreateQuiz";
import { Provider } from 'react-redux';
import store from "../Store/Store";
import '../styles/CreateQuiz.css'
import { QuestionTemplate } from "../components/QuizComponents/QuestionTemplate";
function QuestionTemplateView() {
  return (
    <>
      <Provider store={store}>
        <QuestionTemplate/>
      </Provider>
    </>
  );
}

export default QuestionTemplateView;