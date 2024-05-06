import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

// test("renders homepage with banner image", () => {
//   const { getByAltText } = render(
//     <MemoryRouter>
//       <HomePage />
//     </MemoryRouter>
//   );

//   const bannerImage = getByAltText("Banner");
//   expect(bannerImage).toBeInTheDocument();
// });

test("Home page", () => {
  const component = renderer.create(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// test("renders buttons for navigation", () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <HomePage />
//     </MemoryRouter>
//   );

//   const chooseFromCollectionButton = getByText("Choose From Our Collection");
//   const personaliseAndCreateButton = getByText(
//     "Personalise and Create Your Card"
//   );
//   const personaliseWithLetterButton = getByText(
//     "PERSONLISE WITH A FUTURE LETTER"
//   );

//   expect(chooseFromCollectionButton).toBeInTheDocument();
//   expect(personaliseAndCreateButton).toBeInTheDocument();
//   expect(personaliseWithLetterButton).toBeInTheDocument();
// });
