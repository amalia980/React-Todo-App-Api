import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151/");
      if (res.status === 200) {
        const data = await res.json();
        const myData = data.results;
        setFetchedData(myData);
      } else {
        throw new Error("Error occurred when trying to fetch data: " + res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (fetchedData.length > 0) {
      const randomIndex = Math.floor(Math.random() * fetchedData.length);
      setCurrentIndex(randomIndex);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (fetchedData.length > 0) {
      const randomItem = fetchedData[currentIndex];
      setData(randomItem);
    }
  }, [currentIndex, fetchedData]);

  const handleAdd = () => {
    if (currentIndex < fetchedData.length - 1) {
      const updatedIndex = currentIndex + 1;
      const previousItem = fetchedData[currentIndex];
      setCurrentIndex(updatedIndex);
      if (currentIndex > 0) {
        setDisplayData((prevData) => [...prevData, previousItem]);
      }
    }
  };
  
  return (
    <div role="div" className="background">
      <div role="div">
        <h1>Todo List</h1>

        <div className="preview-item-container">
        <span className="name-span">
          {data.name}
        </span>
        
          <button className="add-name-btn" role="button" aria-label="ADD" data-testid="display-data" onClick={handleAdd}>Add new task</button>
          </div>

        <TodoList data={displayData} displayData={displayData} setDisplayData={setDisplayData} />
      </div>
    </div>
  );
}

export default App;