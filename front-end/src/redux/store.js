import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./userDetailsReducer";
import designListReducer from "./designListReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  designs: designListReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default configureStore({
  reducer: rootReducer,
});
