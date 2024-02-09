import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    SignIn: (state, action) => {
      state.currentUser = action.payload;
    },

    Logout: (state) =>{
      state.currentUser = null;
    },
    
  }
});

export const { SignIn, Logout} = UserSlice.actions;
export default UserSlice.reducer;