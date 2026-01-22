import { create } from "zustand";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  score: number;
  showScore: boolean;
  questions: Question[];
  selectAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  restQuiz: () => void;
}
const useQuizStore = create<QuizState>((set) => ({
  //   state
  currentQuestion: 0,
  answers: Array(10).fill(null),
  score: 0,
  showScore: false,

  questions: [
    {
      question: "What is React primarily used for?",
      options: [
        "Server-side scripting",
        "Building user interfaces",
        "Database management",
        "Mobile device hardware control",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a React component?",
      options: [
        "A CSS file",
        "A reusable piece of UI",
        "A database table",
        "A JavaScript loop",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which command is used to create a new React app using Create React App?",
      options: [
        "npm build react-app",
        "npx create-react-app myApp",
        "npm install react-app",
        "react-new myApp",
      ],
      correctAnswer: 1,
    },
    {
      question: "What hook is used to manage state in a functional component?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correctAnswer: 2,
    },
    {
      question: "JSX stands for:",
      options: [
        "Java Syntax Extension",
        "JavaScript XML",
        "JSON XML",
        "Java Source X",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which method is used to render React content to the DOM?",
      options: [
        "React.render()",
        "renderDOM()",
        "ReactDOM.render()",
        "DOM.renderReact()",
      ],
      correctAnswer: 2,
    },
    {
      question: "Props in React are:",
      options: [
        "Mutable",
        "Used to store component state",
        "Read-only data passed to components",
        "Only used in class components",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the purpose of useEffect?",
      options: [
        "To create components",
        "To handle side effects in components",
        "To update JSX",
        "To manage routing",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which key helps React identify elements in a list?",
      options: ["id", "index", "key", "ref"],
      correctAnswer: 2,
    },
    {
      question: "What is the virtual DOM?",
      options: [
        "A copy of the real DOM kept in memory",
        "The actual browser DOM",
        "A database for UI",
        "A CSS rendering engine",
      ],
      correctAnswer: 0,
    },
  ],

  //   Action
  selectAnswer: (optionIndex) =>
    set((state) => {
      const updatedAnswers = [...state.answers];
      updatedAnswers[state.currentQuestion] = optionIndex;
      return { answers: updatedAnswers };
    }),
  nextQuestion: () =>
    set((state) => {
      // Last question?
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;
      if (isLastQuestion) {
        let finalScore = 0;
        state.answers.forEach((answer, index) => {
          // selected answer = correct answer ?
          if (answer === state.questions[index].correctAnswer) {
            finalScore += 1;
          }
        });
        return {
          score: finalScore,
          showScore: true,
        };
      }
      // if not the last question yet, go to the next question
      return {
        currentQuestion: state.currentQuestion + 1,
      };
    }),
  prevQuestion: () =>
    set((state) => ({
      // Use Math.max to prevent negative values(not lower than 0)
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),
  restQuiz: () =>
    set((state) => ({
      currentQuestion: 0,
      answers: Array(state.questions.length).fill(null), //reset answers
      score: 0,
      showScore: false,
    })),
}));

export default useQuizStore;
