import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import placesReducer from '../features/places/placesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
    favorites: favoritesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});