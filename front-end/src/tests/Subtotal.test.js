import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Subtotal from "../path/to/SubtotalComponent";

describe("Subtotal Component", () => {
  const mockStore = configureStore();
  const initialState = {
    cart: {
      cart: [
        {
          designImageURI: "design-image.jpg",
          designPrice: 49.99,
        },
      ],
    },
    user: {
      user: {
        userID: "user123",
      },
    },
  };
  const store = mockStore(initialState);

  it("matches snapshot", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <Subtotal />
        </Provider>
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles checkbox change correctly", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Subtotal />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = getByLabelText(
      "Add envelopes to protect your postcards with an additional charge of £ 0.99 per card."
    );
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});
