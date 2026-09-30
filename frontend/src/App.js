import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import { LoginPage } from './components/LoginPage';
import { AutocompleteInput } from './components/AutocompleteInput';
import { PlaceMap } from './components/PlaceMap';
import { SearchHistory } from './components/SearchHistory';
import { FavoritesPanel } from './components/FavoritesPanel';
import {
  selectPlace,
  selectSearchHistory,
  selectSelectedPlace,
} from './features/places/placesSlice';
import { logout, selectIsAuthenticated } from './features/auth/authSlice';

function App() {
  const isAuthed = useSelector(selectIsAuthenticated);

  if (!isAuthed) return <LoginPage />;

  return <MainApp />;
}

function MainApp() {
  const { isLoaded, loadError } = useGoogleMaps();
  const dispatch = useDispatch();
  const selectedPlace = useSelector(selectSelectedPlace);
  const history = useSelector(selectSearchHistory);

  const handlePlaceSelected = useCallback(
    (place) => dispatch(selectPlace(place)),
    [dispatch]
  );

  if (loadError) {
    return (
      <div className="p-8 text-red-600">
        Failed to load Google Maps. Check your API key in .env.
      </div>
    );
  }
  if (!isLoaded) {
    return <div className="p-8 text-gray-600">Loading Google Maps...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <header className="px-6 pt-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Places Explorer
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Search, explore, and save your favorite locations.
            </p>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </header>

        <div className="px-6">
          <AutocompleteInput onPlaceSelected={handlePlaceSelected} />
        </div>

        <div className="mt-6">
          <PlaceMap place={selectedPlace} />
        </div>

        <SearchHistory history={history} />
        <FavoritesPanel />
      </div>
    </div>
  );
}

export default App;