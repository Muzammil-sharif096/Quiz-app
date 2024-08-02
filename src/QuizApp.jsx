import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "Q: Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 'JavaScript',
    },
    {
        question: "Q: What does CSS stand for?",
        options: ["Central Style Sheets", 'Cascading Style Sheets', 'Cascading Simple Sheets', 'Cars SUVs Sailboats'],
        answer: 'Cascading Style Sheets',
    },
    {
        question: "Q: What does HTML stand for?",
        options: ['Hypertext Markup Language', 'Hypertext Markdown Language', 'Hyperloop Machine Language', 'Helicopters Terminals Motorboats Lamborginis'],
        answer: 'Hypertext Markup Language',
    },
    {
        question: "Q: What year was JavaScript launched?",
        options: ['1996', '1995', '1994', 'none of the above'],
        answer: '1995'
    }
];

const QuizApp = () => {
    const [newQuestion, setNewQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (timeLeft === 0) {
            handleOptionClk(null);
        }

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleOptionClk = (option) => {
        if (selectedOption !== null) return;

        setSelectedOption(option);
        if (option === questions[newQuestion].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = newQuestion + 1;
            if (nextQuestion < questions.length) {
                setNewQuestion(nextQuestion);
                setTimeLeft(10);
                setSelectedOption(null);
            } else {
                setShowScore(true);
            }
        }, 1000);
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4 animate-backgroundChange">
                <div className="container bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 md:p-10 lg:p-16 mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6  italic animate-bounce">Quiz App</h1>
                    {showScore ? (
                        <div className="text-center p-6">
                            <h1 className="text-3xl md:text-4xl italic font-extrabold text-gray-800">Your Score: {score} / {questions.length}</h1>
                            <button
                                className="bg-blue-500 mt-8 w-full text-lg md:text-xl hover:bg-blue-700 transition-colors duration-300 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                                onClick={handleReload}
                            >
                                Restart Quiz
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="text-center italic my-6 md:my-8">
                                <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">{questions[newQuestion].question}</h1>
                                <div className="text-lg md:text-xl font-semibold text-red-600 mb-4">Time left: {timeLeft} seconds</div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {questions[newQuestion].options.map((option) => (
                                    <button
                                        key={option}
                                        className={`w-full py-4 px-8 italic rounded-full text-base md:text-lg font-bold transition-colors duration-300 transform 
                                        ${selectedOption !== null && option === questions[newQuestion].answer
                                                ? 'bg-green-500 text-white'
                                                : selectedOption === option && option !== questions[newQuestion].answer
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }
                                        hover:scale-105
                                    `}
                                        onClick={() => handleOptionClk(option)}
                                        disabled={selectedOption !== null}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuizApp;
