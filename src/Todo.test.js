import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('renders Todo component with initial data', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [];
  
    const { getByText } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    expect(getByText(mockData.name)).toBeInTheDocument();
  });
  
  test('allows editing and saving the Todo component', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [];
  
    const { getByText, getByRole } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    fireEvent.click(getByText('EDIT'));
  
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  
    fireEvent.change(input, { target: { value: 'Updated Task' } });
  
    fireEvent.click(getByText('SAVE'));
  
    expect(getByText('Updated Task')).toBeInTheDocument();
  });
  
  test('calls handleDelete when delete button is clicked', () => {
    const mockData = { name: 'Task 1' };
    const mockSetDisplayData = jest.fn();
    const mockDisplayData = [mockData];
  
    const { getByText } = render(
      <Todo data={mockData} setDisplayData={mockSetDisplayData} displayData={mockDisplayData} />
    );
  
    fireEvent.click(getByText('DELETE'));
  
    expect(mockSetDisplayData).toHaveBeenCalledWith([]);
  });
  