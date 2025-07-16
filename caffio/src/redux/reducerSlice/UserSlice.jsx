import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  token: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    logoutUser: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
