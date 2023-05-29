
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('fetches data and sets fetchedData state correctly', async () => {
  const mockedFetch = jest
    .spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'Pokemon 1' },
          { name: 'Pokemon 2' },
          { name: 'Pokemon 3' },
        ],
      }),
    });
  
  render(<App />);

  await waitFor(() => {
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=151/'
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId('display-data')).toBeInTheDocument();
  });
});





//####################################

test('handleAdd updates currentIndex and displayData correctly', async () => {
  const mockedFetchedData = [
    { name: 'Pokemon 1' },
    { name: 'Pokemon 2' },
    { name: 'Pokemon 3' },
  ];

  // Mock the useState hook
  const useStateMock = (initialValue) => {
    const state = initialValue;
    const setState = jest.fn().mockImplementation((newValue) => {
      if (typeof newValue === 'function') {
        state[0] = newValue(state[0]);
      } else {
        state[0] = newValue;
      }
    });
    return [state[0], setState];
  };

  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  // Render the App component
  render(<App />);

  // Mock the fetch function
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ results: mockedFetchedData }),
  });

  // Simulate a button click that triggers handleAdd
  fireEvent.click(screen.getByLabelText('ADD'));

  // Verify the expected changes in state
  await waitFor(() => {
    expect(React.useState).toHaveBeenCalled();
    expect(React.useState).toHaveBeenCalledWith(0);
    expect(React.useState).toHaveBeenCalledWith([]);

    expect(screen.getByText('Pokemon 1')).toBeInTheDocument();
  });
});

// test('sets the initial index correctly', () => {
//   const mockSetCurrentIndex = jest.fn();
//   const mockUseState = jest
//     .fn()
//     .mockReturnValueOnce([], jest.fn()) // Mock fetchedData
//     .mockReturnValueOnce(0, mockSetCurrentIndex); // Mock currentIndex

//   jest.spyOn(React, 'useState').mockImplementation(mockUseState);

//   render(<App />);

//   expect(mockSetCurrentIndex).toHaveBeenCalledWith(expect.any(Number));
// });


// test('sets the initial data correctly', async () => {
//   render(<App />);

//   await waitFor(() => {
//     expect(screen.getByText('Pokemon 1')).toBeInTheDocument();
//   });
// });





    // 1. Test case for fetching data:
    //     Mock the fetch function to return a predefined response.
    //     Verify that setFetchedData is called with the correct data.

    // 2. Test case for setting initial index:
    //     Mock the fetchedData array with a specific set of data.
    //     Verify that setCurrentIndex is called with the correct initial index.

    // 3. Test case for setting initial data:
    //     Mock the fetchedData array with a specific set of data.
    //     Verify that setData is called with the correct initial data.

    // 4. Test case for handleAdd function:
    //     Set up the initial state of fetchedData, currentIndex, and displayData.
    //     Call handleAdd function.
    //     Verify that setCurrentIndex is called with the updated index.
    //     Verify that setDisplayData is called with the updated display data.

    //dessa fyra första i alla fall

    // 5. Test case for rendering elements:
    //     Render the component.
    //     Use assertions to check if the expected elements are present, such as the "Todo List" heading, the data value, and the "ADD" button.

    // 6. Test case for button click:
    //     Render the component.
    //     Simulate a button click on the "ADD" button.
    //     Verify that handleAdd function is called.

    // 7. Test case for TodoList component:
    //     Render the component with specific props.
    //     Verify that the TodoList component receives the correct props and renders the expected elements.


// //########################################################################################

// test('sets the initial index correctly', () => {
//   const mockSetData = jest.fn();
//   const mockGetCurrentIndex = jest.fn().mockReturnValue(0);
//   const mockUseState = jest.fn()
//     .mockReturnValueOnce([], mockSetData)
//     .mockReturnValueOnce(0, mockGetCurrentIndex);

//   jest.spyOn(React, 'useState').mockImplementation(mockUseState);

//   const { queryByRole } = render(<App />);
//   const addButton = queryByRole('button', { name: 'ADD' });

//   // Simulate clicking the button
//   fireEvent.click(addButton);

//   // Assert that the setCurrentIndex has been called with the expected value
//   expect(mockSetData).toHaveBeenCalledWith(1);
// });

// //########################################################################################


// test('sets the initial data correctly', async () => {
//   global.fetch = jest.fn().mockResolvedValue({
//     json: jest.fn().mockResolvedValue({
//       results: [
//         { name: 'Pokemon 1' },
//         { name: 'Pokemon 2' },
//         { name: 'Pokemon 3' },
//       ],
//     }),
//   });

//   // Render the App component
//   render(<App />);

//   // Wait for the data to be fetched and the component to re-render
//   await waitFor(() => {
//     // Assert that the initial data is set correctly
//     const renderedDataElement = screen.getByText('Pokemon 1');
//     expect(renderedDataElement).toBeInTheDocument();
//   });
// });

// //########################################################################################

// const mockedFetchedData = [
//   { name: 'Pokemon 1' },
//   { name: 'Pokemon 2' },
//   { name: 'Pokemon 3' },
// ];

// const useStateSpy = jest.spyOn(React, 'useState');
// useStateSpy.mockReturnValueOnce([mockedFetchedData, jest.fn()])
//   .mockReturnValueOnce([0, jest.fn()])
//   .mockReturnValueOnce([[], jest.fn()]);

// const { getByLabelText } = render(<App />);

// fireEvent.click(getByLabelText('ADD'));

// expect(useStateSpy).toHaveBeenCalledWith(expect.arrayContaining(mockedFetchedData));
// expect(useStateSpy).toHaveBeenCalledWith(1);
// expect(useStateSpy).toHaveBeenCalledWith([mockedFetchedData[0]]);