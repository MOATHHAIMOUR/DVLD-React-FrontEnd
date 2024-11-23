// selectedPersonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedPersonState {
  PersonId: number | null;
  NationalNo: string | null;
  IsUser: boolean | null;
}

const initialState: SelectedPersonState = {
  PersonId: null,
  NationalNo: null,
  IsUser: null,
};

const PeopleSlice = createSlice({
  name: "PeopleSlice",
  initialState,
  reducers: {
    setSelectedPerson(
      _state: SelectedPersonState,
      action: PayloadAction<SelectedPersonState>
    ) {
      return action.payload;
    },
  },
});

export const { setSelectedPerson } = PeopleSlice.actions;
export default PeopleSlice.reducer;
