import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
  });
  console.log(response.data);
  if (response.status === 200) {
    props.setConfirmRidePopupPanel(false)
    props.setRidePopupPanel(false)
    navigate('/captain-riding', { state: { ride: props.ride } })
}
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Confirm Ride</h3>
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <h2 className="text-lg font-semibold">{props.ride?.user.fullname.firstname}</h2>
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
        <div className="w-full mt-6">
          <form onSubmit={submitHandler}>
          <input
            required
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            className="bg-[#eeeeee] outline-[#767676] rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
            type="number"
            placeholder="Enter OTP"
          />
          <button className="w-full flex justify-center mt-4 bg-black text-white font-semibold p-3 rounded-lg">
          Confirm Ride
        </button>
        <button
          onClick={() => {
            props.setRidePopupPanel(false);
            props.setConfirmRidePopupPanel(false);
          }}
          className="w-full mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg"
        >
          Cancel
        </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
