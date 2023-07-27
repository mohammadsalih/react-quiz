function NextButton({ dispatch, answer, numberOfQuestions, index }) {
  if (answer === null) return null;

  if (index === numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "finish",
          })
        }
      >
        fnish
      </button>
    );
  if (index < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "next" })}
      >
        Next
      </button>
    );
}

export default NextButton;
