import React from "react";
import { render } from "@testing-library/react";
import Popup from "./Popup";
test("Popup component matches snapshot", () => {
  const handleOpen = true;
  const handleClose = jest.fn();
  const severity = "info";
  const message = "This is a test message";

  const { container } = render(
    <Popup
      handleOpen={handleOpen}
      handleClose={handleClose}
      severity={severity}
      message={message}
    />
  );

  expect(container).toMatchSnapshot();
});
