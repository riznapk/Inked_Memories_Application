import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import ViewOrderDetails from "../pages/ViewOrderDetails";
import { MemoryRouter } from "react-router-dom";
test("View order details", () => {
  const data = {
    orderID: "123456",
    orderPlacedDate: "2023-08-06",
    status: "Processing",
    payment: "Credit Card",
    amount: 99.99,
    cartItems: [
      {
        designImageURI: "design-image.jpg",
        cartID: "cart123",
        designFont: "Arial",
        designPrice: 49.99,
        message: "Test message for snapshot testing",
        scheduledDate: "2023-08-10",
        isLetterIncluded: true,
        address: {
          streetAddress: "123 Main St",
          city: "Cityville",
          county: "Countyshire",
          postalCode: "12345",
        },
      },
    ],
  };
  const component = renderer.create(
    <MemoryRouter>
      <ViewOrderDetails data={data} />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
