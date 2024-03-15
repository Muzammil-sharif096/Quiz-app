import React, { useState } from 'react';

const questions = [
    {
        question: " Q : Which language runs in a web  browser ?",
        options: ["Java", "C", "Python", "JavaScript",],
        answer: 'JavaScript',
    },
    {
        question: " Q : What does CSS stand for ?",
        options: ["Central Style Sheets", 'Cascading Style Sheets', 'Cascading Simple Sheets', 'Cars SUVs Sailboats'],
        answer: 'Cascading Style Sheets',
    },
    {
        question: " Q : What does HTML stand for ?",
        options: ['Hypertext Markup Language', 'Hypertext Markdown Language', 'Hyperloop Machine Language', 'Helicopters Terminals Motorboats Lamborginis'],
        answer: 'Hypertext Markup Language',
    },
    {
        question: " Q : What year was JavaScript  launched ?",
        options: ['1996', '1995', '1994', 'none of the above'],
        answer: '1995'
    }
];

const QuizApp = () => {
    const [newQuestion, setnewQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleOptionClk = (answer) => {
        const nextQuestion = newQuestion + 1;
        if (nextQuestion < questions.length) {
            setnewQuestion(nextQuestion);
        }
        else {
            setShowScore(true);
        }
        if (answer === questions[newQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    // "hello muzamil"
    return (
        <div className="container bg-gray-400 rounded-3xl shadow-2xl w-2/4 p-20 m-40 mx-auto">
            {
                showScore ? (
                    <div className="text-center p-6">
                        <h1 className='text-3xl italic font-bold'>Your Score: {score} out of {questions.length}</h1>
                        <button
                            className="bg-blue-500 text-xl tracking-widest hover:bg-blue-700 text-white font-bold py-2 px-4 
                            rounded mt-4"
                            onClick={handleReload}
                        >
                            Restart Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="text-center my-8">
                            <h1 className="text-2xl italic font-bold">{questions[newQuestion].question}</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {
                                questions[newQuestion].options.map((option) => (
                                    <button
                                        key={option}
                                        className="bg-blue-500 hover:bg-blue-900 hover:text-white  italic text-xl tracking-widest font-bold py-2 px-4 rounded"
                                        onClick={() => handleOptionClk(option)}
                                    >
                                        {option}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};


export default QuizApp;
