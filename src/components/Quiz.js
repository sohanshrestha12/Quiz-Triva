import React, { useState } from "react";
import { useEffect } from "react";
import QuizAnswer from "./QuizAnswer";

const Quiz = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get("tag");
  const diff = searchParams.get("diff");
  const [data, setData] = useState([]);
  const [questionOptions, setquestionOptions] = useState([]);
  const [counter, setCounter] = useState({ count: 1, usercorrectAnswer: 0 });
  const [selectedAns, setselectedAns] = useState({
    isSelected: false,
    selAnswer: "",
  });
  const removeSelected = () => {
    let ans = document.getElementsByClassName("ans");
    Array.from(ans).forEach((element, i) => {
      element.classList.remove("selected");
    });
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const handleNext = () => {
    console.log(selectedAns.selAnswer);
    console.log(data[0].correctAnswer);
    setCounter((oldcount) => ({
      count: oldcount.count + 1,
      usercorrectAnswer:
        selectedAns.selAnswer === data[0].correctAnswer
          ? oldcount.usercorrectAnswer + 1
          : oldcount.usercorrectAnswer,
    }));
    setselectedAns((prevState) => ({ ...prevState, isSelected: false }));
    fetchQuestion();
    removeSelected();
  };

  const fetchQuestion = async () => {
    const url = `https://the-trivia-api.com/v2/questions?limit=1&tags=${tag}&difficulties=${diff}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "ApiKeyAuth",
      },
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const allanswer = jsonData[0].incorrectAnswers.concat(
      jsonData[0].correctAnswer
    );
    setData(jsonData);
    console.log(allanswer);
    console.log(jsonData);
    shuffleArray(allanswer);
    setquestionOptions([allanswer]);
    console.log(allanswer);
  };
  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {console.log(counter.count)}
      {counter.count > 10 ? (
        <div className="container" style={{flexDirection:'column'}}>
            <h1 style={{textAlign:'center'}}>Your Result</h1>
          <div className="box">
            <h2>Your Score</h2>
            <h5 style={{fontSize:'22px'}}>{counter.usercorrectAnswer}</h5>
          </div>
        </div>
      ) : (
        <>
          <h1 style={{textAlign:'center',margin:'20px 0 0 0'}}>Quiz</h1>
          {data[0] && data[0].question && (
            <div className="container">
              <div className="quiz">
                <span>
                  {counter.count}
                  {"/10"}
                </span>
                <h2>{data[0].question.text}</h2>
                <div className="answer">
                  {questionOptions[0].map((item, index) => {
                    return (
                      <QuizAnswer
                        key={index}
                        item={item}
                        index={index}
                        sel={setselectedAns}
                      />
                    );
                  })}
                </div>
                <div className="button">
                  {console.log(selectedAns)}
                  {console.log(counter)}
                  <button
                    onClick={handleNext}
                    disabled={counter.count > 10 || !selectedAns.isSelected}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
