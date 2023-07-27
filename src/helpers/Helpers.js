export async function fetchData(url) {
  const controller = new AbortController();

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid data received from the server.");
    }

    return data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.message);
      throw error;
    }
  }
}

export function reducePoints(questionsData) {
  let totalPoints = 0;
  questionsData.forEach((question) => {
    totalPoints += question.points;
  });
  return totalPoints;
}

export function calculatePercentage(value, total) {
  return Math.ceil((value / total) * 100);
}

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const API = "http://localhost:8000/questions";
