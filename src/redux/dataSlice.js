import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    latitude: '',
    longitude: '',
    address: '',
    authId: '',
  },
  reducers: {
    updateLatitude: (state, actions) => {
      state.latitude = actions.payload;
    },
    updateLongitude: (state, actions) => {
      state.longitude = actions.payload;
    },
    updateAddress: (state, actions) => {
      state.address = actions.payload;
    },
    updateAuthId: (state, actions) => {
      state.authId = actions.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateLongitude,
  updateLatitude,
  updateAddress,
  updateAuthId
} = DataSlice.actions

export default DataSlice.reducer