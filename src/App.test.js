import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

beforeEach(() => {
  jest.clearAllMocks();
});

test("fetches data and sets fetchedData state correctly", async () => {
  const mockedFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: [
        { name: "Pokemon 1" },
        { name: "Pokemon 2" },
        { name: "Pokemon 3" },
      ],
    }),
  });

  render(<App />);

  await waitFor(() => {
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=151/"
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId("display-data")).toBeInTheDocument();
  });
});

test("should update data correctly when handleAdd is executed", async () => {
  const mockData = [
    { name: "Pokemon1" },
    { name: "Pokemon2" },
    { name: "Pokemon3" },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue({ results: mockData }),
  });

  const { getByTestId } = render(<App />);

  await waitFor(() => {
    expect(getByTestId("name").textContent).toBe("Pokemon1");
  });

  const addButton = getByTestId("display-data");
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(getByTestId("name").textContent).toBe("Pokemon2");
  });
});
