import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "101/246, chaya apartment indrapuri, Bhopal",
    "LG - 246, Sonagiri, Bhopal",
    "Mogli park, Minal recidency, Bhopal",
  ];

  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div key={index} onClick={() => {
            props.setVehiclepanelOpen(true)
            props.setOpenpanel(false)
            }} className="flex items-center border-2 border-gray-50 active:border-black p-2 rounded-xl justify-start gap-3 my-2">
            <h2 className="bg-[#eee] py-2 px-3 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
