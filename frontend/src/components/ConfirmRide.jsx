import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className="flex items-center justify-between flex-col gap-2">
        <img
          className="h-24"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-lg font-medium">567/11-A</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">245/71-C</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-t border-gray-300">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fares[props.vehicleType]}</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          props.setSearchingRidePanel(true)
          props.createRide()
          }} className="w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
