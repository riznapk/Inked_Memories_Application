import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order: {},
  orderList: [],
  orderListForAdmin: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.order = { ...action?.payload };
    },
    setAllOrderData(state, action) {
      state.orderList = { ...action?.payload };
    },
    //admin
    setAllOrderDataForAdmin(state, action) {
      state.orderListForAdmin = { ...action?.payload };
    },

    clearOrderInfo(state, action) {
      state.order = {};
      state.orderList = [];
      state.orderListForAdmin = [];
    },
  },
});

export const {
  addOrder,
  clearOrderInfo,
  setAllOrderData,
  setAllOrderDataForAdmin,
} = orderSlice.actions;
export default orderSlice.reducer;
