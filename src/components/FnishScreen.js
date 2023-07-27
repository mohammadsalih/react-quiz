import { calculatePercentage } from "../helpers/Helpers.js";

function FnishScreen({ points, totalPoints, dispatch, highScore }) {
  return (
    <div>
      <p className="result">
        You scored {points} out of {totalPoints}{" "}
        {calculatePercentage(points, totalPoints)}%
      </p>

      <p className="highscore">(Highscore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "restart",
          })
        }
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FnishScreen;
