import React from "react";
import "./TodoList.css";
import Todo from "./Todo";

const TodoList = ({ displayData, setDisplayData }) => {
  return (
    <div className="todo-card-container">
      {displayData.length > 0 ? (
        displayData.map((data, index) => {
          return (
            <div key={index} data-testid="todo-item">
              <Todo
                data={data}
                displayData={displayData}
                setDisplayData={setDisplayData}
              />
            </div>
          );
        })
      ) : (
        <div className="nothing-added-span">
          <p>No todo added...</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
