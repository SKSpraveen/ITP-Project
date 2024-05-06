import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header'; 
//import Footer from '../include/_footer'; 
import './adminfaq.css';

const FAQAdmin = ({ addFaqs, updateFaqs, submitted, data, isEdit }) => {
    
    const [faqquestion, setFaqQuestion] = useState("");
    const [faqanswer, setFaqAnswer] = useState("");
    const [submitButtonNamefaq, setSubmitButtonNamefaq] = useState("Submit My FAQ");
    const [faqQuestionError, setFaqQuestionError] = useState("");
    const [faqAnswerError, setFaqAnswerError] = useState("");
    
    useEffect(() => {
        if (!submitted) {
            setFaqQuestion('');
            setFaqAnswer('');
        }
    }, [submitted]);
  
    useEffect(() => {
        if (isEdit) {
            setSubmitButtonNamefaq("Update My FAQ");
            setFaqQuestion(data.faqquestion);
            setFaqAnswer(data.faqanswer);
        } else {
            setSubmitButtonNamefaq("Submit My FAQ");
        }
    }, [isEdit, data]);

    const handleFaqQChange = (event) => {
        const value = event.target.value;
        setFaqQuestion(value);
        if (value.trim() === "") {
            setFaqQuestionError("Question is required");
        } else {
            setFaqQuestionError("");
        }
    };
  
    const handleFaqAChange = (event) => {
        const value = event.target.value;
        setFaqAnswer(value);
        if (value.trim() === "") {
            setFaqAnswerError("Answer is required");
        } else {
            setFaqAnswerError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!faqquestion.trim()) {
            setFaqQuestionError("Question is required");
            return;
        } else {
            setFaqQuestionError("");
        }

        if (!faqanswer.trim()) {
            setFaqAnswerError("Answer is required");
            return;
        } else {
            setFaqAnswerError("");
        }

        if (isEdit) {
            updateFaqs({
                id: data._id,
                faqquestion,
                faqanswer,
            });
        } else {
            addFaqs({
                id: data._id,
                faqquestion,
                faqanswer,
            });
        }
        setFaqQuestion("");
        setFaqAnswer("");
    };

    return (
        <div>
            <Header /> 
            <div className="form-container">
                <div id="popupsmart-feedback">
                    <form onSubmit={handleSubmit}>
                        <label class="labelnuw" htmlFor="faqquestion">Question:</label><br />
                        <textarea id="faqquestion" name="faqquestion" value={faqquestion} onChange={handleFaqQChange} placeholder="Your question"></textarea>
                        {faqQuestionError && <span className="error">{faqQuestionError}</span>}<br />
      
                        <label class="labelnuw" htmlFor="faqanswer">Answer:</label><br />
                        <textarea id="faqanswer" name="faqanswer" value={faqanswer} onChange={handleFaqAChange} placeholder="Your answer"></textarea>
                        {faqAnswerError && <span className="error">{faqAnswerError}</span>}<br />
                
                        <input class="inputfeedback" type="submit" value={submitButtonNamefaq} />
                    </form>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    );
}

export default FAQAdmin;
