function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${
            answer !== null
              ? `${index === answer ? "answer" : ""} ${
                  index === question.correctOption
                    ? "correct"
                    : "wrong"
                }`
              : ""
          }`}
          onClick={() =>
            dispatch({ type: "newAnswer", payload: index })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
