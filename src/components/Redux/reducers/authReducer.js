import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") | null,
    adminToken: localStorage.getItem("adminToken") | null,
    email: "",
    adminEmail: "",
    isAdminLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    adminLogin: (state, action) => {
      state.adminToken = action.payload;
      localStorage.setItem("adminToken", action.payload);
    },
    adminLogout: (state, action) => {
      state.adminToken = null;
      localStorage.removeItem("adminToken");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAdminEmail: (state, action) => {
      state.adminEmail = action.payload;
    },
    setIsAdminLoggedIn: (state, action) => {
      state.isAdminLoggedIn = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setEmail,
  setIsAdminLoggedIn,
  setAdminEmail,
  adminLogin,
  adminLogout,
} = authSlice.actions;
export default authSlice.reducer;
