import React, { useEffect, useState } from "react";
import Tags from "./Tags";
import { Link } from "react-router-dom";

const Home = () => {
  const [filteredTags, setfilteredTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = "https://the-trivia-api.com/v2/totals-per-tag";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "ApiKeyAuth",
        },
      };
      try {
        const response = await fetch(tags, options);
        const data = await response.json();
        const dataArray = Object.entries(data).map(([key, value]) => ({
          key,
          value,
        }));
        const filtags = dataArray.filter((item) => {
          return item.value >= 10;
        });
        setfilteredTags(filtags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTags();
  }, []);
  return (
    <>
      <h1 style={{marginTop:'20px',fontSize:'50px', textAlign: "center" }}>Welcome to the Quiz</h1>
      <h2 style={{ textAlign: "center" }}>Please select the Category</h2>
      <div className="container">
        {filteredTags.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/difficulty?tag=${encodeURIComponent(item.key)}`}
            >
              <Tags data={item} />;
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
