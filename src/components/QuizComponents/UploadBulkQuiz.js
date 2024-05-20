import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 
import '../../styles/UploadBulkQuiz.css'
import AdminNavbar from '../AdminNavbar';
import axios from 'axios'; 
import { BulkUploadQuestion } from '../../middleware/QuestionApi';

const UploadBulkQuiz = () => {
  const [files, setFiles] = useState(undefined);
  const inputref = useRef();
  const navigate = useNavigate();
  const [importedQuestions, setImportedQuestions] = useState([]);
  const allowedFileTypes = ['.xlsx'];

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    validateFiles(selectedFiles);
};

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  const validateFiles = (files) => {
    const selectedFileNames = Array.from(files).map(file => file.name);
    const invalidFiles = selectedFileNames.filter(fileName => !allowedFileTypes.some(type => fileName.endsWith(type)));

    if (invalidFiles.length > 0) {
        alert(`Invalid file types: ${invalidFiles.join(', ')}. Please select .xlsx file`);
    } else {
        setFiles(files);
    }
};

  const handleFileUpload = async (e) => {
    e.preventDefault();
    BulkUploadQuestion(files);
    navigate('/')
  };
  return (
    <>
      <AdminNavbar />
      <div id='uploadContent'>
        <h5 id="heading" style={{ marginTop: "-40%", marginLeft: "25%" }}>Upload Question from device </h5>
        <div id='dropzone'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt style={{ fontSize: "50px", marginTop: "-3%" , color:"#365486" }} />
          <h5 id='heading'>Drag and Drop Files to Upload</h5>
          <h5 id='heading'>Or</h5>
          <input type='file' multiple onChange={handleFileChange} hidden ref={inputref}/>
          <button class="btn btn-light" style={{backgroundColor:"#365486", color:"white"}} onClick={(e) => { e.preventDefault(); inputref.current.click() }}>Browse Files</button>
        </div>
        <div style={{ marginLeft: "25%", marginTop: "2%" }}>
          <h5 id="heading">Supported File formats : .xlsx</h5>
          <br />

          {files ? <>
            <div >
              <h6>Selected File </h6>
              {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
            </div></> : <>
          </>

          }
        </div>
        <br />
        <div className="position-absolute start-50 translate-middle">
          <button
            style={{backgroundColor:"#365486", color:"white"}} 
            className="btn btn-light mt-3"
            type="submit"
            onClick={handleFileUpload}
            disabled={!files||files.length===0}
          >
            Upload File
          </button>
        </div>


      </div>
    </>
  )
};

export default UploadBulkQuiz
