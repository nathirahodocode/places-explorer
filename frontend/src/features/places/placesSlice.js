import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlace: null,
  searchHistory: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    selectPlace: (state, action) => {
      state.selectedPlace = action.payload;
      const exists = state.searchHistory.some(
        (p) => p.place_id === action.payload.place_id
      );
      if (!exists) state.searchHistory.unshift(action.payload);
      if (state.searchHistory.length > 20) state.searchHistory.pop();
    },
    clearHistory: (state) => {
      state.searchHistory = [];
      state.selectedPlace = null;
    },
  },
});

export const { selectPlace, clearHistory } = placesSlice.actions;
export const selectSelectedPlace = (state) => state.places.selectedPlace;
export const selectSearchHistory = (state) => state.places.searchHistory;

export default placesSlice.reducer;