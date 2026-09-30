import React, { useEffect, useRef } from 'react';

export const AutocompleteInput = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google?.maps?.places || !inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['geocode', 'establishment'],
        fields: ['place_id', 'name', 'formatted_address', 'geometry'],
      }
    );

    const listener = autocompleteRef.current.addListener(
      'place_changed',
      () => {
        const place = autocompleteRef.current.getPlace();
        if (place?.geometry?.location) onPlaceSelected(place);
      }
    );

    return () => window.google.maps.event.removeListener(listener);
  }, [onPlaceSelected]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Search Location
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a location..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};