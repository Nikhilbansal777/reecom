import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") | null, email: "" },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    }
  },
});

export const { login, logout, setEmail } = authSlice.actions;
export default authSlice.reducer;
