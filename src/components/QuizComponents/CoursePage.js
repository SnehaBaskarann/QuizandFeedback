import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoLogoHtml5 } from "react-icons/io5";
import { PiFileCssFill } from "react-icons/pi";


function CoursePage() {
  const handleTopicClick = (topic) => {
    console.log(`You clicked on ${topic}`);
    // You can add more logic here for what happens when a topic is clicked
  };

  return (
    <div>
      
      
      <h5 style={{marginTop:"5%" , textAlign:"center" , color:"midnightblue"}}>Course Page</h5>
      <Accordion id="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header><IoLogoHtml5 style={{fontSize:"30px" , color:"orange"}}/><b>Introduction to HTML</b></Accordion.Header>
          <Accordion.Body>
            <ul>
              {['HTML Basic', 'HTML Elements', 'Html Attributes', 'Html Styles', 'Html Tables'].map((topic) => (
                <li key={topic} onClick={() => handleTopicClick(topic)}>
                  {topic}
                  <div className="topic-buttons">
                    <Button variant="primary" size="sm">Add Quiz</Button>
                    <Button variant="secondary" size="sm" style={{marginLeft:"5px"}}>Add Feedback</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><PiFileCssFill style={{fontSize:"30px" , color:"midnightblue"}}/><b>CSS</b></Accordion.Header>
          <Accordion.Body>
            <ul>
              {['Introduction to CSS', 'CSS Elements', 'CSS Selectors'].map((topic) => (
                <li key={topic} onClick={() => handleTopicClick(topic)}>
                  {topic}
                  <div className="topic-buttons">
                    <Button variant="primary" size="sm">Add Quiz</Button>
                    <Button variant="secondary" size="sm" style={{marginLeft:"5px"}}>Add Feedback</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CoursePage;
