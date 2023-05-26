import React from "react";
import "./TodoList.css";
import Todo from "./Todo";

const TodoList = ({ displayData, setDisplayData }) => {

    return (
        <div>
            <div className='todo-card-container'>
                {displayData.length > 0 ? (
                    displayData.map((data, index) => {
                        return (
                            <div>
                                <Todo
                                    key={index}
                                    data={data}
                                    displayData={displayData}
                                    setDisplayData={setDisplayData} />
                        </div>
                    )})
                ) : (
                        <p>No todo added...</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;