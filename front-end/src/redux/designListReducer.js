import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  designList: [],
  selectedDesignItem: {},
  //for admin only
  designDetails: {},
  designSuggesions: [],
  detectedObjectsList: [],
};
const designListSlice = createSlice({
  name: "designs",
  initialState,
  reducers: {
    addDesignInfo(state, action) {
      state.designList = action.payload;
    },
    addSelectedDesignItem(state, action) {
      state.selectedDesignItem = { ...action?.payload };
    },
    // for admin only
    uploadDesignDetails(state, action) {
      state.designDetails = { ...action?.payload };
    },
    addDetectedObjectList(state, action) {
      state.detectedObjectsList = action.payload;
    },
    clearDesignInfo(state, action) {
      state.designList = [];
      state.selectedDesignItem = {};
      state.designDetails = {};
      state.designSuggesions = [];
      state.detectedObjectsList = [];
    },
  },
});

export const {
  addDesignInfo,
  clearDesignInfo,
  addSelectedDesignItem,
  uploadDesignDetails,
  addDetectedObjectList,
} = designListSlice.actions;
export default designListSlice.reducer;
