import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import PageNotFound from "../components/PageNotFound";

test("PageNotFound component testing", () => {
  const component = renderer.create(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
