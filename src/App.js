import { useEffect, useReducer } from "react";
import {
  fetchData,
  API,
  reducePoints,
  formatTime,
} from "./helpers/Helpers.js";
import Question from "./components/Question.js";
import Header from "./components/Header.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import Main from "./components/Main.js";
import Progress from "./components/Progress.js";
import NextButton from "./components/NextButton.js";
import StartScreen from "./components/StartScreen.js";
import FnishScreen from "./components/FnishScreen.js";
import "./index.css";
import Timer from "./components/Timer.js";

const initialState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timer: 8 * 60,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,

        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore
            ? state.points
            : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };

    case "updateTimer":
      return {
        ...state,
        timer: action.payload,
      };

    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const totalPoints = reducePoints(questions);

  useEffect(function () {
    async function fetchDataAndInitialize() {
      try {
        const data = await fetchData(API);

        dispatch({
          type: "dataRecieved",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({
          type: "dataFailed",
        });
      }
    }

    fetchDataAndInitialize();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              totalPoints={totalPoints}
              points={points}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <footer>
              <Timer
                time={formatTime(timer)}
                timer={timer}
                dispatch={dispatch}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numberOfQuestions={numberOfQuestions}
                index={index}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FnishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
