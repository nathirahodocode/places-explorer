import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { favoritesApi } from '../../api/favoritesApi';

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (place, { rejectWithValue }) => {
    try {
      return await favoritesApi.add({
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry?.location?.lat(),
        longitude: place.geometry?.location?.lng(),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await favoritesApi.getAll();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (id, { rejectWithValue }) => {
    try {
      await favoritesApi.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload.content || [];
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((f) => f.id !== action.payload);
      });
  },
});

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;

export default favoritesSlice.reducer;