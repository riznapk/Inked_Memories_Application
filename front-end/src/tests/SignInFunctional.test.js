import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signin from "./Signin";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Signin component", () => {
  test("renders login form correctly", () => {
    render(<Signin />);
    expect(screen.getByLabelText("User Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Register Here")).toBeInTheDocument();
  });

  test("submits the form correctly", () => {
    const mockOnSubmit = jest.fn();
    Signin.defaultProps.onSubmit = mockOnSubmit;
    const mockDispatch = jest.fn();
    Signin.defaultProps.dispatch = mockDispatch;

    render(<Signin />);

    userEvent.type(screen.getByLabelText("User Email"), "test@example.com");
    userEvent.type(screen.getByLabelText("Password"), "test123");

    fireEvent.click(screen.getByText("Login"));

    expect(mockOnSubmit).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
