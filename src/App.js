import "./App.css";
import TodoList from "./TodoList";
import React from "react";

function App() {
  const [data, setData] = React.useState([]);
  const [fetchedData, setFetchedData] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayData, setDisplayData] = React.useState([]);

  const getData = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151/");
      const data = await res.json();
      const myData = data.results;
      setFetchedData(myData);
    } catch (error) {
      console.log("Error occurred when trying to fetch data: ", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (fetchedData.length > 0) {
      const randomIndex = Math.floor(Math.random() * fetchedData.length);
      setCurrentIndex(randomIndex);
    }
  }, [fetchedData]);

  React.useEffect(() => {
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

        <span
          type="text"
          value={data.name}
        ></span>
        
        <button role="button" aria-label="ADD" data-testid="display-data" onClick={handleAdd}>ADD</button>

        <TodoList data={displayData} displayData={displayData} setDisplayData={setDisplayData} />
      </div>
    </div>
  );
}

export default App;
