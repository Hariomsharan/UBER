import React from "react";

const VehiclePanel = (props) => {   
  
  return (
    <div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehicleType('car')
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-xl font-medium">
            UberGo
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="text-lg font-normal">2 min away</h5>
          <p className="font-light text-sm">Affordable, Compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fares.car}</h2>
        {/* <h2 className="text-xl font-semibold">₹190</h2> */}

      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehicleType('motorcycle')
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-xl font-medium">
            Moto
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="text-lg font-normal">2 min away</h5>
          <p className="font-light text-sm">Affordable motorcycle rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fares.motorcycle}</h2>
        {/* <h2 className="text-xl font-semibold">₹100</h2> */}
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehicleType('auto')
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714469695/assets/db/413026-fd04-4bd1-a85c-f5d9c26da3a9/original/UberComfort-Premium.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-xl font-medium">
            Premier
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="text-lg font-normal">2 min away</h5>
          <p className="font-light text-sm">
            Comfortable sedans, top quelity drivers
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fares.car}</h2>
        {/* <h2 className="text-xl font-semibold">₹300</h2> */}
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.setVehicleType('auto')
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="text-xl font-medium">
            UberAuto
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="text-lg font-normal">2 min away</h5>
          <p className="font-light text-sm">Affordable auto rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fares.auto}</h2>
        {/* <h2 className="text-xl font-semibold">₹150</h2> */}
      </div>
    </div>
  );
};

export default VehiclePanel;
