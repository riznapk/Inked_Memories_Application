import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux"; // Import Provider if needed for Redux
import { BrowserRouter as Router } from "react-router-dom"; // Import Router if needed

import Register from "./Register";

// Mock the useDispatch and useNavigate functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Register component", () => {
  test("renders registration form correctly", () => {
    render(<Register />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Already a member?")).toBeInTheDocument();
    expect(screen.getByText("SignIn Here")).toBeInTheDocument();
  });

  test("submits the form correctly", () => {
    const mockOnSubmit = jest.fn();
    Register.defaultProps.onSubmit = mockOnSubmit;
    const mockDispatch = jest.fn();
    Register.defaultProps.dispatch = mockDispatch;

    render(<Register />);

    userEvent.type(screen.getByLabelText("First Name"), "John");
    userEvent.type(screen.getByLabelText("Last Name"), "Doe");
    userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    userEvent.type(screen.getByLabelText("Phone Number"), "1234567890");
    userEvent.type(screen.getByLabelText("Password"), "Test@123");
    userEvent.type(screen.getByLabelText("Confirm Password"), "Test@123");

    fireEvent.click(screen.getByText("Register"));

    expect(mockOnSubmit).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
