import React from "react";
import useQuizStore from "../store/useQuizStore";

const Question = () => {
  const {
    questions,
    currentQuestion,
    selectAnswer,
    answers,
    nextQuestion,
    prevQuestion,
    showScore,
    restQuiz,
    score,
  } = useQuizStore();

  const question = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  const handleSelect = (optionIndex: any) => {
    selectAnswer(optionIndex);
  };

  const handleSubmit = () => {
    nextQuestion();
  };

  if (showScore) {
    return (
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-semibold">Your Score</h2>
        <p className="mt-4 text-lg">
          Your Scored {score} out of {questions.length}
        </p>
        <button
          onClick={restQuiz}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="w-3/4 p-6">
      <h3 className="text-2xl font-semibold">{question.question}</h3>
      <div className="mt-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            className={`my-2 p-3 border rounded-lg cursor-pointer transition-colors ${currentAnswer === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
          >
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={currentAnswer === index}
                className="mr-3 w-4 h-4 text-blue-600"
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {currentQuestion > 0 && (
          <button
            onClick={prevQuestion}
            className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
        )}

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            disabled={currentAnswer === null}
            className={`px-4 py-2 rounded ${
              currentAnswer === null
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
