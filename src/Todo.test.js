import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// 1. Initial rendering: Verify that the initial rendering of the component shows the name from data, an "edit" button, and a "delete" button.

// 2. Edit mode: Click the "edit" button and verify that the component switches to edit mode, showing an input field with the value from data.name and a "save" button.

// 3. Save edit: In edit mode, modify the input field value, click the "save" button, and verify that the component switches back to normal mode, displaying the updated value.

// 4. Delete item: Click the "delete" button and verify that the item is removed from the displayData state.

test('renders Todo component with initial data', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [];
  
    const { getByText } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    // Verify that the initial data is rendered
    expect(getByText(mockData.name)).toBeInTheDocument();
  });
  
  test('allows editing and saving the Todo component', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [];
  
    const { getByText, getByRole } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    // Click the edit button
    fireEvent.click(getByText('EDIT'));
  
    // Verify that the input field appears
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  
    // Modify the input value
    fireEvent.change(input, { target: { value: 'Updated Task' } });
  
    // Click the save button
    fireEvent.click(getByText('SAVE'));
  
    // Verify that the edited value is rendered
    expect(getByText('Updated Task')).toBeInTheDocument();
  });
  
  test('calls handleDelete when delete button is clicked', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [mockData];
  
    const { getByText } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    // Click the delete button
    fireEvent.click(getByText('DELETE'));
  
    // Verify that handleDelete is called with the correct data
    expect(mockSetDisplayData).toHaveBeenCalledWith([]);
  });
  