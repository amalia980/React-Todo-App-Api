import React from "react";

const Todo = ({ data, setDisplayData, displayData}) => {
  
  const [val, setVal] = React.useState(data.name)
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleInput = (e) => {
    setVal(e.target.value)
  }
  
  React.useEffect(() => {
    setVal(data.name);
  }, [data]);
  
  const handleDelete = (itemToDelete) => {
    const newArray = displayData.filter(item => item.name !== itemToDelete.name);
    setDisplayData(newArray);
  }

  if (isEditing) {
    return (
      <div>
        <input type="text" value={val} onChange={handleInput} />
        <button onClick={handleSave}>save</button>
      </div>
    )
  }

  return (
    <div>
      <span>{val}</span>
      <button onClick={handleEdit}>edit</button>
      <button onClick={() => handleDelete(data)}>delete</button>
    </div>
  );
};

export default Todo;
