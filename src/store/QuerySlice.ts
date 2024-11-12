// selectedPersonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilterBy {
  FilterBy: string;
  FilterValue: string;
}
interface IQueryState {
  PageSize: number;
  PageNumber: number;
  AdvanceFilters: Array<IFilterBy>;
  Filter: IFilterBy;
}

const initialState: IQueryState = {
  PageNumber: 1,
  PageSize: 10,
  AdvanceFilters: [],
  Filter: {
    FilterBy: "",
    FilterValue: "",
  },
};

const PeopleSlice = createSlice({
  name: "QuerySlice",
  initialState,
  reducers: {
    setPageSize(state: IQueryState, action: PayloadAction<number>) {
      state.PageNumber = action.payload;
    },
    setPageNumber(state: IQueryState, action: PayloadAction<number>) {
      state.PageNumber = action.payload;
    },
    AddAdvanceFilter(state: IQueryState, action: PayloadAction<IFilterBy>) {
      if (
        !state.AdvanceFilters.some(
          (f) => f.FilterBy === action.payload.FilterBy
        )
      ) {
        state.AdvanceFilters.push(action.payload);
      }
    },
    RemoveAdvanceFilter(state: IQueryState, action: PayloadAction<string>) {
      state.AdvanceFilters = state.AdvanceFilters.filter(
        (filter) => filter.FilterBy !== action.payload
      );
    },
    AddSimpleFilter(state: IQueryState, action: PayloadAction<IFilterBy>) {
      state.Filter = action.payload;
    },
  },
});

export const {
  AddAdvanceFilter,
  RemoveAdvanceFilter,
  setPageNumber,
  setPageSize,
  AddSimpleFilter,
} = PeopleSlice.actions;
export default PeopleSlice.reducer;
