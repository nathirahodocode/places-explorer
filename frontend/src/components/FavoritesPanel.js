import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFavorites,
  removeFavorite,
  selectFavorites,
  selectFavoritesError,
  selectFavoritesStatus,
} from '../features/favorites/favoritesSlice';

export const FavoritesPanel = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const status = useSelector(selectFavoritesStatus);
  const error = useSelector(selectFavoritesError);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="p-6 border-t">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Favorites (saved in DB)
      </h3>
      {error && <p className="text-red-500 text-sm mb-2">{String(error)}</p>}
      {status === 'loading' && (
        <p className="text-sm text-gray-500">Loading...</p>
      )}
      {!favorites.length && status !== 'loading' && (
        <p className="text-sm text-gray-500">No favorites saved yet.</p>
      )}
      <ul className="space-y-2">
        {favorites.map((fav) => (
          <li
            key={fav.id}
            className="flex justify-between items-center bg-yellow-50 p-3 rounded border"
          >
            <div>
              <p className="font-medium text-gray-800">{fav.name}</p>
              <p className="text-xs text-gray-500">{fav.address}</p>
            </div>
            <button
              onClick={() => dispatch(removeFavorite(fav.id))}
              className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};