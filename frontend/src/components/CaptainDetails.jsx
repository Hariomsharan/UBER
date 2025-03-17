import { React, useContext } from "react";
import { CaptainDataContext } from "../Context/captainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <h2 className="text-xl font-semibold capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h2>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-semibold -mb-1">₹295.2</h4>
          <p className="text-base font-medium text-gray-600">earned</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 bg-gray-200 rounded-lg mt-2">
        <div className="text-center">
          <i className="text-2xl text-gray-600 font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl text-gray-600 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">30.5km</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
        <div className="text-center">
          <i className="text-2xl text-gray-600 font-thin ri-file-list-line"></i>
          <h5 className="text-lg font-medium">20</h5>
          <p className="text-sm text-gray-600">Total Jobs</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
