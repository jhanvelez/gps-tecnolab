import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const speedSlice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    setSpeed: (state, action) => {
      return action.payload;
    },
  }
});
export const { setSpeed } = speedSlice.actions;

export default speedSlice.reducer;
