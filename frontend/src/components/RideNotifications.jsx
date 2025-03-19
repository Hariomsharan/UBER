import React from "react";

const RideNotifications = (props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <h2 className="text-lg font-semibold">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold">₹{props.ride?.fare}</h4>
          <p className="text-xs font-medium text-gray-400">2.2 km</p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-lg font-medium">567/11-A</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">245/71-C</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmRidePopupPanel(true);
            props.confirmRide();
          }}
          className="w-full mt-4 bg-black text-white font-semibold p-3 rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={() => props.setRidePopupPanel(false)}
          className="w-full mt-1 bg-gray-200 text-gray-700 font-semibold p-3 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RideNotifications;
