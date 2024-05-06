// import React from "react";
// import renderer from "react-test-renderer";
// import { act } from "react-dom/test-utils";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Button, TextField, Typography, Grid } from "@mui/material";
// import { useFormik } from "formik";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import * as yup from "yup";
// import Signin from "../components/Signin";

// // Mocking useDispatch and useSelector from 'react-redux'
// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// // Create a mock Redux store
// const mockStore = configureStore([]);

// test("Signin renders correctly", () => {

//   const dispatch = jest.fn();
//   const state = {

//   };

//   useDispatch.mockReturnValue(dispatch);
//   useSelector.mockReturnValue(state);

//   const component = renderer.create(
//     <Provider store={mockStore({})}>
//       <Router>
//         <Signin />
//       </Router>
//     </Provider>
//   );

//   let tree;

//   act(() => {
//     tree = component.toJSON();
//   });

//   expect(tree).toMatchSnapshot();
// });
