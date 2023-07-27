function Progress({ numberOfQuestions, index, totalPoints, points }) {
  return (
    <header className="progress">
      <progress value={index} max={numberOfQuestions} />
      <p>
        Question {index + 1} / {numberOfQuestions}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
