import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('clicking the "ADD" button updates displayData', async () => {
  const mockData = [
    {
      name: 'Item 1',
    },
    {
      name: 'Item 2',
    },
  ];

  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ results: mockData }),
  });

  render(<App />);

  const addButton = screen.getByLabelText('ADD');
  fireEvent.click(addButton);

  expect(screen.getByText('Item 1')).toBeInTheDocument();

  // Find and assert the text from another component
  const otherComponentText = screen.getByText('Your Text Here');
  expect(otherComponentText).toBeInTheDocument();

  expect(displayData).toEqual([{ name: 'Item 1' }]);
});