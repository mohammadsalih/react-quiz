import { useEffect } from "react";

function Timer({ time, timer, dispatch }) {
  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setInterval(() => {
        dispatch({ type: "updateTimer", payload: timer - 1 });
      }, 1000);
    } else if (timer === 0) {
      dispatch({ type: "finish" });
    }

    return () => clearInterval(timerId);
  }, [timer, dispatch]);

  return (
    <div className="timer">
      <p>{time}</p>
    </div>
  );
}

export default Timer;
