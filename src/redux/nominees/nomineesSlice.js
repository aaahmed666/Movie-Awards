import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNominees: {},
};

const nomineesSlice = createSlice({
  name: "nominees",
  initialState,
  reducers: {
    selectNominee(state, action) {
      const { categoryId, nominee } = action.payload;
      state.selectedNominees[categoryId] = nominee;
    },
    deselectNominee(state, action) {
      const { categoryId } = action.payload;
      delete state.selectedNominees[categoryId];
    },
    resetNominee(state) {
      state.selectedNominees = {};
    },
  },
});

export const { selectNominee, deselectNominee, resetNominee } =
  nomineesSlice.actions;
export default nomineesSlice.reducer;
