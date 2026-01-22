import React from "react";
import useQuizStore from "../store/useQuizStore";
import { FaCheckCircle } from "react-icons/fa";

const Sidebar = () => {
  const { questions, currentQuestion, answers } = useQuizStore();
  return (
    <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Quiz Progress</h2>
      <ul>
        {questions.map((_, index) => {
          const isCurrent = index === currentQuestion;
          const isAnswered = answers[index] !== null;

          return (
            <li
              key={index}
              className={`flex items-center p-2 rounded-lg transition-all ${
                isCurrent ? "bg-white shadow-sm ring-1 ring-blue-500" : ""
              }`}
            >
              <FaCheckCircle
                className={`mr-3 text-lg ${
                  isAnswered ? "text-green-500" : "text-gray-300"
                }`}
              />
              <span
                className={`text-sm ${
                  isCurrent ? "font-bold text-blue-600" : "text-gray-500"
                }`}
              >
                Question {index + 1}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 pt-6 border-t border-gray-300 text-xs text-gray-400">
        Progress: {answers.filter((a) => a !== null).length}/ {questions.length}{" "}
        Answered
      </div>
    </div>
  );
};

export default Sidebar;
