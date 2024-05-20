import React, { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/CreateQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ValidationQuizTitle, ValidationDuration, ValidationGrade, ValidationAttempts } from '../../utils/ValidationCreateQuiz';
import { DeleteQuizDetails, createquiz } from '../../middleware/api';
import { DeleteQuestion, GetAllQuestion, GetOpenEditQuestionModal, PostSingleQuestion, UpdateQuestion } from '../../middleware/QuestionApi';
// import { getQuizById } from '../../middleware/api';
import { GetQuizDetails } from '../../middleware/api';
// import { setAttempts } from '../../actions/CreateQuizAction';
import { PutQuizDetails } from '../../middleware/api';
import Alert from '@mui/material/Alert';
import BasicPagination from '../../components/QuizComponents/Pagination';
   


export const Home = ({ questions, loading, GetAllQuestion, editQuiz }) => {

    const [searchTerm, setSearchTerm] = useState(''); 

    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [attemptsAllowed, setAttemptsAllowed] = useState('');
    const [error, setError] = useState('');
    const [errorduration, setErrorDuration] = useState('');
    const [errormark, setErrormark] = useState('');
    const [errorattempts, setErrorAttempt] = useState('');
    const location = useLocation();
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showQuizEditModal, setShowQuizEditModal] = useState(false);
    const [showQuizDeleteModal, setShowQuizDeleteModal] = useState(false);
    const [inputQuizTitle, setInputQuizTitle] = useState('');
    const [errordeletequiz, setErrorDeleteQuiz] = useState('');
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });
    const [quizDetails, setQuizDetails] = useState({
        nameOfQuiz: '',
        duration: '',
        passMark: '',
        attemptsAllowed: ''
    });
    const [quizData, setQuizData] = useState({
        nameOfQuiz: '',
        duration: 0,
        passMark: 0,
        attemptsAllowed: ''
    });

    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
        question: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });


    useEffect(() => {
        fetchQuestions();
        fetchQuizData();
    }, []);

    const toggleOptions = (event) => {
        event.preventDefault();
        setShowOptions(!showOptions);
        event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
    };

    const handleUploadClick = (e) => {
        createquiz(quizDetails);
        e.preventDefault()
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const isFormValid = () => {
        return quizDetails.nameOfQuiz !== '' && quizDetails.duration !== '' && quizDetails.passMark !== '' && quizDetails.attemptsAllowed !== '';
    };

    const handleQuizTitleChange = (e) => {
        ValidationQuizTitle(e.target.value, setError, setQuizTitle);
        handleQuizChange(e);
    };

    const handleInputChange = (e) => {
        ValidationDuration(e.target.value, setDuration, setErrorDuration);
        handleQuizChange(e);
    };

    const handlemarkChange = (e) => {
        ValidationGrade(e.target.value, setPassMark, setErrormark);
        handleQuizChange(e);
    };

    const handleattemptsChange = (e) => {
        ValidationAttempts(e.target.value, setAttemptsAllowed, setErrorAttempt);
        handleQuizChange(e);
    }

    const handleOpenAddQuestionModal = () => {
        setShowAddQuestionModal(true);
    };

    const handleCloseAddQuestionModal = () => {
        setShowAddQuestionModal(false);
    };

    const handleCloseQuizEditModal = () => {
        setShowQuizEditModal(false);
    }

    const handleCloseQuizDeleteModal = () => {
        setShowQuizDeleteModal(false);
    }

    const handleOpenQuizEditModal = () => {
        setShowQuizEditModal(true);
    }

    const handleOpenQuizDeleteModal = () => {
        setShowQuizDeleteModal(true);
    }

    const handleChange = (index, field, value) => {

        if (field === 'correctOptions') {
            setNewQuestion(prevState => ({
                ...prevState,
                correctOptions: [...prevState.correctOptions.slice(0, index), value, ...prevState.correctOptions.slice(index + 1)]
            }));
        } else {
            setNewQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
        }
    };

    const handleQuizChange = (e) => {
        setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value })
        setQuizData({ ...quizData, [e.target.name]: e.target.value })
    };

    const handleSaveQuestion = () => {
        const requestBody = {
            quizId: "",
            question: newQuestion.question,
            questionType: newQuestion.questionType,
            options: newQuestion.options.map((option, index) => ({
                option: option,
                isCorrect: newQuestion.correctOptions.includes(option) // Check if option is in correctOptions array
            }))
        };

        PostSingleQuestion(requestBody);
        window.location.reload();
        handleCloseAddQuestionModal();
    };

    const handleQuestionTypeChange = (e) => {
        const value = e.target.value;
        setSelectedQuestionType(value);
        setNewQuestion(prevState => ({
            ...prevState,
            questionType: value,
            options: [],
            correctOptions: []
        }));
    };

    const handleDurationChange = (e) => {
        setDuration('SET_DURATION', e.target.value);
    };

    const handleGradeChange = (e) => {
        setPassMark('SET_PASSMARK', e.target.value);
    };

    const fetchQuizData = async () => {
        try {
            const data = await GetQuizDetails();
            setQuizData(data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchQuestions = async () => {
        try {
            await GetAllQuestion();
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleUpdateQuiz = () => {
        const updatedQuizData = {
            nameOfQuiz: quizData.nameOfQuiz,
            duration: parseInt(quizData.duration),
            attemptsAllowed: parseInt(quizData.attemptsAllowed),
            passMark: parseInt(quizData.passMark)
        };

        PutQuizDetails(updatedQuizData);
        handleCloseQuizEditModal();
    };

    // const handleDeleteQuiz = () => {
    //     DeleteQuizDetails();
    // };
    const handleDeleteQuiz = () => {
        console.log('Entered Title:', inputQuizTitle);
        console.log('Actual Quiz Title:', quizData.nameOfQuiz);

        if (inputQuizTitle === quizData.nameOfQuiz) {
            DeleteQuizDetails();
            alert('Quiz deleted successfully');
            handleCloseQuizDeleteModal();
        } else {
            setErrorDeleteQuiz('The QuizTitle you entered does not match !');
        }
    };

    const handleQuizTitle = (event) => {
        setInputQuizTitle(event.target.value);
    };




    const handleOpenEditQuestionModal = async (quizQuestionId) => {
        try {
            const response = await GetOpenEditQuestionModal(quizQuestionId);
            const questionData = response;
            setEditedQuestion({
                quizQuestionId: quizQuestionId,
                question: questionData.question,
                questionType: questionData.questionType,
                options: questionData.options.map(option => option.option),
                correctOptions: questionData.options.filter(option => option.isCorrect).map(option => option.option)
            });

            setShowEditQuestionModal(true);
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
    };

    const handleDeleteQuestion = (quizQuestionId) => {
        DeleteQuestion(quizQuestionId);
        window.location.reload();
    };

    const handleCloseEditQuestionModal = () => {
        setShowEditQuestionModal(false);
        window.location.reload();
    };

    const handleUpdateQuestion = () => {
        const { quizQuestionId, questionType, ...updatedQuestion } = editedQuestion;
        const updatedOptions = updatedQuestion.options.map((option, index) => ({
            option,
            isCorrect: updatedQuestion.correctOptions.includes(option)
        }));

        const requestBody = {
            ...updatedQuestion,
            options: updatedOptions,
            questionType: questionType,
            quizId: '22a43258-f99b-4b7b-98d9-40d5a3e09bc3'
        };

        UpdateQuestion(quizQuestionId, requestBody);
        handleCloseEditQuestionModal();
    };


    useEffect(() => {
        const newFilteredQuestions = questions.filter(question =>
            !selectedQuestionType || question.questionType === selectedQuestionType
        );
        setFilteredQuestions(newFilteredQuestions);
    }, [selectedQuestionType, questions]);

    // Function to handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const searchFilteredQuestions = questions.filter(question =>
        question.question.toLowerCase().includes(searchTerm) &&
        (!selectedQuestionType || question.questionType === selectedQuestionType)
      );

    // Calculate the questions to display on the current page
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const currentQuestions = searchFilteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
      };
      
    
   
  
    return (
        <div >
            
          
            <AdminNavbar />

            <input id='search'
                        type="search"
                        placeholder="Search..."
                        className='search-box'
                        onChange={handleSearchChange}
                        
                    />

            <form className=' main-content'>
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                {/* <a onClick={handleOpenQuizEditModal}><BiSolidPencil style={{ fontSize: "25", marginLeft: "90%" }} /></a> */}
                                <Button class="btn btn-light" style={{ marginLeft: "80%", marginTop: "-1.5%", backgroundColor: "#365486", color: "white" }} onClick={handleOpenQuizEditModal}><AiFillEdit /> Edit</Button>
                                <Button class="btn btn-light" style={{ marginLeft: "89%", marginTop: "-6.5%", backgroundColor: "#365486", color: "white" }} onClick={handleOpenQuizDeleteModal}><FaTrashCan /> Delete</Button>
                                {/* onClick={handleDeleteQuiz} */}
                                {/* <a onClick={handleDeleteQuiz}><FaTrashCan style={{ fontSize: "23", marginLeft: "2%" }} /></a> */}
                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Quiz Title<span id='required'>*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} name='nameOfQuiz' value={quizData.nameOfQuiz} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration (In Minutes)<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} name='duration' value={quizData.duration} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} name='passMark' value={quizData.passMark} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" className="form-control" id="lbl1" placeholder="Attempts Allowed" style={{ borderRadius: 8 }} name='attemptsAllowed' value={quizData.attemptsAllowed} readOnly />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <Button type="submit" className="btn btn-light" onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8, backgroundColor: "#365486", color: "white" }} disabled={!isFormValid()}><FaUpload /> Import Question</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="form-group row mt-4">
                <div className="col-sm-2" id="filter">
                    <select id="questionType" className="form-control" value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value)}>
                        <option value="" disabled selected>Filter by question type</option>
                        <option value="">All</option>
                        <option value="MCQ">MCQ</option>
                        <option value="MSQ">MSQ</option>
                        <option value="TF">True/False</option>
                    </select>
                </div>
            </div>

            {/* --------------------------------------------------------------*/}
            <div className='question template container'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {/* {questions && questions.length > 0 && ( */}
                {currentQuestions.length > 0 ? (
                    <div style={{ marginTop: "-20%", marginLeft: "15%" }}>
                        <h5>Uploaded Questions</h5>
                        <div style={{ marginTop: "-6px", marginLeft: "68.5%" }}>
                            {/* <Pagination/> */}

                            <div>
                                <BasicPagination
                                    totalQuestions={filteredQuestions.length}
                                    questionsPerPage={questionsPerPage}
                                    page={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>


                        </div>
                        {/* {questions.filter(question => !selectedQuestionType || question.questionType === selectedQuestionType).map((question, index) => ( */}

                        {currentQuestions.map((question, index) => (

                            <div key={index} className='card mt-4' style={{ backgroundColor: "rgb(237, 231, 231)" }}>
                                <div className='d-flex justify-content-end'>
                                    <a onClick={() => { handleOpenEditQuestionModal(question.quizQuestionId) }} className='m-2 me-2'><AiFillEdit style={{ fontSize: "30", color: "#365486" }} /></a>
                                    <a onClick={() => { handleDeleteQuestion(question.quizQuestionId) }} className='m-2 ms-3'><FaTrashCan style={{ fontSize: "23", color: "#365486" }} /></a>
                                    {/* <Button class="btn btn-light" style={{marginLeft:"80%" , marginTop:"-3%" , backgroundColor:"#365486", color:"white"}} onClick={handleOpenQuizEditModal}><AiFillEdit/> Edit</Button>
                                <Button class="btn btn-light" style={{marginLeft:"89%" , marginTop:"-8.5%", backgroundColor:"#365486", color:"white"}} onClick={handleDeleteQuiz}><FaTrashCan/> Delete</Button> */}
                                </div>
                                <div className="card-body">
                                    <h5 className='card-title'>Question Type : {question.questionType}</h5>
                                    <h5 className="card-title">Question {question.questionNo}:</h5>

                                    <input value={question.question} className='form-control' readOnly />
                                    <div className="form-group">
                                        <label>Options:</label>
                                        {question.options.map((option, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control mt-2"
                                                value={option.option}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label>Correct Answers:</label>
                                        {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control mt-2"
                                                value={correctOption.option}
                                                readOnly
                                            />

                                        ))}

                                    </div>

                                    <button onClick={handleOpenAddQuestionModal} className="btn btn-light mt-3 mb-5 float-right" style={{ backgroundColor: "#365486", color: "white" }}>Add More Question</button>
                                </div>
                            </div>



                        ))}

                    </div>
                    ) : (
                        <p>No questions match your search.</p>
                )}

            </div>
            {/* DeleteQuiz */}
            <Modal show={showQuizDeleteModal} onHide={handleCloseQuizDeleteModal}>
                <Modal.Header  style={{backgroundColor:"#23275c" , color:"whitesmoke"}}>
                    <Modal.Title><h5>Deleting the Quiz</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <div className="container">
                        <div className="form-group row mt-3">
                            <label htmlFor="lbl1" className="col-sm-10 col-form-label" style={{ fontWeight: "bold" }}>To confirm, deleting type the QuizTitle "{quizData.nameOfQuiz}"in the Input<span id='required'>*</span></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} onChange={handleQuizTitle} />
                                {errordeletequiz && <p style={{ color: 'red', fontSize: "50" }}>{errordeletequiz}</p>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <Button variant="secondary" onClick={handleCloseQuizDeleteModal}>Back</Button>
                    <Button variant="danger" onClick={handleDeleteQuiz}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* EditQuiz */}
            <Modal show={showQuizEditModal} onHide={handleCloseQuizEditModal}>
                <Modal.Header closeButton style={{backgroundColor:"#23275c" ,color:"whitesmoke"}}>
                    <Modal.Title><h5>Quiz Editor</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <div className="container">
                        <div className="form-group row mt-3">
                            <label htmlFor="lbl1" className="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Quiz Title<span id='required'>*</span></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} name='nameOfQuiz' value={quizData.nameOfQuiz} onChange={(e) => { handleQuizTitleChange(e); handleQuizChange(e) }} />
                                {error && <p style={{ color: 'red', fontSize: "50" }}>{error}</p>}
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl3" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Duration(In Minutes)<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} name='duration' value={quizData.duration} onChange={(e) => { handleDurationChange(e); handleQuizChange(e); handleInputChange(e) }} />
                                {errorduration && <p style={{ color: 'red', fontSize: "50" }}>{errorduration}</p>}
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl5" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} name='passMark' value={quizData.passMark} onChange={(e) => { handleGradeChange(e); handleQuizChange(e); handlemarkChange(e) }}></input>
                                {errormark && <p style={{ color: 'red', fontSize: "50" }}>{errormark}</p>}
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl4" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="number" className="form-control" id="lbl1" placeholder="Attempts Allowed" style={{ borderRadius: 8 }} name='attemptsAllowed' value={quizData.attemptsAllowed} onChange={(e) => { handleQuizChange(e); handleattemptsChange(e) }} />
                                {errorattempts && <p style={{ color: 'red', fontSize: "50" }}>{errorattempts}</p>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <Button variant="secondary" onClick={handleCloseQuizEditModal}>Back</Button>
                    <Button variant="primary" onClick={handleUpdateQuiz}>Update</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditQuestionModal} onHide={handleCloseEditQuestionModal}>
                <Modal.Header closeButton  style={{backgroundColor:"#23275c" ,color:"whitesmoke"}}>
                    <Modal.Title><h5>Edit Question</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <div className="form-group">
                        <label>Question:</label>
                        <input className='form-control' type="text" value={editedQuestion.question} onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })} />
                    </div>
                    {editedQuestion.options.map((option, index) => (
                        <div className="form-group" key={index}>
                            <label>Option {index + 1}:</label>
                            <input className='form-control' type="text" value={option} onChange={(e) => {
                                const updatedOptions = [...editedQuestion.options];
                                updatedOptions[index] = e.target.value;
                                setEditedQuestion({ ...editedQuestion, options: updatedOptions });
                            }} />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Correct Options:</label>
                        {editedQuestion.correctOptions.map((option, index) => (
                            <input
                                key={index}
                                className='form-control mt-2'
                                type="text"
                                value={option}
                                onChange={(e) => {
                                    const updatedCorrectOptions = [...editedQuestion.correctOptions];
                                    updatedCorrectOptions[index] = e.target.value;
                                    setEditedQuestion({ ...editedQuestion, correctOptions: updatedCorrectOptions });
                                }}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <Button variant="secondary" onClick={handleCloseEditQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateQuestion}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
           {/* AddSingleQuestion */}
            <Modal show={showAddQuestionModal} onHide={handleCloseAddQuestionModal}>
                <Modal.Header closeButton style={{backgroundColor:"#23275c" ,color:"whitesmoke"}}>
                    <Modal.Title><h5>Add New Question</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <div className="form-group">
                        <label>Question Type:</label>
                        <select className='form-control' value={selectedQuestionType} onChange={handleQuestionTypeChange}>
                            <option value="">Select Question Type</option>
                            <option value="MSQ">Multiple Select Question (MSQ)</option>
                            <option value="MCQ">Multiple Choice Question (MCQ)</option>
                            <option value="T/F">True/False (T/F)</option>
                        </select>
                    </div>

                    {selectedQuestionType === 'MSQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {[...Array(8)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            {[...Array(3)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Correct Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.correctOptions[index] || ''} onChange={(e) => handleChange(index, 'correctOptions', e.target.value)} />
                                </div>
                            ))}
                        </>
                    )}
                    {selectedQuestionType === 'MCQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {[...Array(4)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Correct Option:</label>
                                <input className='form-control' type="text" value={newQuestion.correctOptions[0] || ''} onChange={(e) => handleChange(0, 'correctOptions', e.target.value)} />
                            </div>
                        </>
                    )}
                    {selectedQuestionType === 'T/F' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {[...Array(2)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Correct Option:</label>
                                <input className='form-control' type="text" value={newQuestion.correctOptions[0] || ''} onChange={(e) => handleChange(0, 'correctOptions', e.target.value)} />
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "rgb(237, 231, 231)" }}>
                    <Button variant="secondary" onClick={handleCloseAddQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveQuestion}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id='questitle'>Question Library</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' to='/upload'> Add Question from Bulk Upload</Link></h6>
                    <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink' onClick={() => { handleOpenAddQuestionModal(); closeModal() }}> Add New Question</Link></h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        questions: state.questions.questions,
        loading: state.questions.loading,
        error: state.questions.error,
        editQuiz: state.editQuiz
    };
};

const mapDispatchToProps = {
    GetAllQuestion,
    // getQuizById
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
