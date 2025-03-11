import React from "react";

const WaitingForDriver = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        Looking for nearby drivers
      </h3>
      <div className="flex items-center justify-between px-5">
      <img
          className="h-20 w-20 rounded-full absolute left-3 "
          src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="h-24"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-base font-medium">Hariom Sharan</h2>
          <h4 className="text-lg font-semibold">MP04 CD 2244</h4>
          <p className="text-sm font-medium text-gray-600">Maruti Suzuki Alto</p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-lg font-medium">567/11-A</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                Kankariya Talab, Ahamdabaad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-t border-gray-200">
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">245/71-C</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">
                Some Mall, Ahamdabaad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-t border-gray-300">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹190.22</h3>
              <p className="text-sm font-medium -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WaitingForDriver;
