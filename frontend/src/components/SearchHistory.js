import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPlace } from '../features/places/placesSlice';
import { addFavorite } from '../features/favorites/favoritesSlice';

export const SearchHistory = ({ history }) => {
  const dispatch = useDispatch();

  if (!history.length) {
    return (
      <p className="p-6 text-sm text-gray-500">
        No searches yet — try searching for a location above.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 p-6 border-t">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Search History
      </h3>
      <ul className="space-y-2">
        {history.map((place) => (
          <li
            key={place.place_id}
            className="flex justify-between items-center bg-white p-3 rounded border shadow-sm"
          >
            <button
              onClick={() => dispatch(selectPlace(place))}
              className="text-left flex-1 hover:text-blue-600"
            >
              <p className="font-medium text-gray-800">{place.name}</p>
              <p className="text-xs text-gray-500">
                {place.formatted_address}
              </p>
            </button>
            <button
              onClick={() => dispatch(addFavorite(place))}
              className="ml-3 text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              ★ Favorite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};