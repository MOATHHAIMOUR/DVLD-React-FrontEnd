// selectedPersonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedPersonState {
  id: number | null;
  name: string | null;
  NationalNo: string | null;
}

const initialState: SelectedPersonState = {
  id: null,
  name: null,
  NationalNo: null,
};

const PeopleSlice = createSlice({
  name: "PeopleSlice",
  initialState,
  reducers: {
    setSelectedPerson(
      state: SelectedPersonState,
      action: PayloadAction<SelectedPersonState | null>
    ) {
      if (action.payload === null || state?.id === action.payload?.id) {
        return initialState;
      }
      return action.payload;
    },
  },
});

export const { setSelectedPerson } = PeopleSlice.actions;
export default PeopleSlice.reducer;
