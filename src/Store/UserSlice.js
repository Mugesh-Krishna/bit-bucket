import { createSlice } from "@reduxjs/toolkit";
// const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  email: "",
  name:"",
  last_name:""

};

const profileSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload; 
    },
    addname:(state,action)=>{
      state.name = action.payload
    },
    addlast:(state,action)=>{
      state.last_name=action.payload;
    }
  },
});

export const { addEmail ,addname,addlast } = profileSlice.actions;
export default profileSlice.reducer;
