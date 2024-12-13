import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  selectedTheme: "light" | "dark";
}

const initialState: ThemeState = {
  selectedTheme: (localStorage.getItem("theme") as "light" | "dark") || "light",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.selectedTheme = state.selectedTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.selectedTheme); // Persist theme in localStorage
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.selectedTheme = action.payload;
      localStorage.setItem("theme", state.selectedTheme);
    },
  },
});

export const { toggleTheme, setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
