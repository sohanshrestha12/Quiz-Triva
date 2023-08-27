import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Difficulty = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get("tag");
  const [filtereddiff, setfiltereddiff] = useState();
  useEffect(() => {
    const fetchdiff = async () => {
      const difficulty = `https://the-trivia-api.com/v2/metadata?categories=${tag}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "ApiKeyAuth",
        },
      };
      try {
        const response = await fetch(difficulty, options);
        const data = await response.json();
        setfiltereddiff(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdiff();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Select Difficulty</h1>
      <div className="container">
        <Link
          to={`/quiz?tag=${encodeURIComponent(tag)}&diff=${encodeURIComponent(
            "easy"
          )}`}
        >
          <div className="box">
            Easy
            <p>{filtereddiff && filtereddiff.byDifficulty.easy}</p>
          </div>
        </Link>
        <Link
          to={`/quiz?tag=${encodeURIComponent(tag)}&diff=${encodeURIComponent(
            "medium"
          )}`}
        >
          <div className="box">
            Medium
            <p>{filtereddiff && filtereddiff.byDifficulty.medium}</p>
          </div>
        </Link>
        <Link
          to={`/quiz?tag=${encodeURIComponent(tag)}&diff=${encodeURIComponent(
            "hard"
          )}`}
        >
          <div className="box">
            Hard
            <p>{filtereddiff && filtereddiff.byDifficulty.hard}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Difficulty;
