import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeInput,
  setSuggestions
}) => {
  const handleLocationSelect = (location) => {
    if (activeInput === "pickup") {
      setPickup(location);
      setSuggestions([]);
    } else {
      setDestination(location);
      setSuggestions([]);
    }
  };

  return (
    <div>
      {suggestions.map((location, index) => (
        
        <div
          key={index}
          onClick={() => handleLocationSelect(location)}
          className="flex items-center border-2 border-gray-50 active:border-black p-2 rounded-xl justify-start gap-3 my-2"
        >
          <h2 className="bg-[#eee] py-2 px-3 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
