import React from "react";
import "./Todo.css";

const Todo = ({ data, setDisplayData, displayData }) => {
  const [val, setVal] = React.useState(data.name);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleInput = (e) => {
    setVal(e.target.value);
  };

  React.useEffect(() => {
    setVal(data.name);
  }, [data]);

  const handleDelete = (itemToDelete) => {
    const newArray = displayData.filter(
      (item) => item.name !== itemToDelete.name
    );
    setDisplayData(newArray);
  };

  if (isEditing) {
    return (
      <div className="todo-item">
        <input
          className="input-edit"
          type="text"
          value={val}
          onChange={handleInput}
        />
        <button className="save-btn" onClick={handleSave}>
          SAVE
        </button>
      </div>
    );
  }

  return (
    <div className="todo-item">
      <span>{val}</span>
      <div>
        <button className="edit-btn" onClick={handleEdit}>
          EDIT
        </button>
        <button className="delete-btn" onClick={() => handleDelete(data)}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Todo;
