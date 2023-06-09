import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

test("renders todo list with items", () => {
  const displayData = [
    { name: "Pokemon 1" },
    { name: "Pokemon 2" },
    { name: "Pokemon 3" },
  ];

  render(<TodoList displayData={displayData} />);

  const todoItems = screen.getAllByTestId("todo-item");
  expect(todoItems.length).toBe(displayData.length);
});