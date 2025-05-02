import { React, useEffect, useContext} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SocketContext } from "../Context/socketContext"
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const { ride } = location.state || {}
  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)

  socket.on('ride-ended', () => {
    navigate('/home')
  })

  return (
    <div className="h-screen relative">
    <Link to={"/home"} className="fixed flex items-center justify-center h-10 w-10 bg-white rounded-full right-2 top-2">
    <i className="text-lg font-semibold ri-home-9-line"></i>
    </Link>
      <div className="h-1/2">
      <LiveTracking pickup={ride.pickup} destination={ride.destination}/>
      </div>
      <div className="h-1/2 p-4 absolute bg-white">
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
            <h2 className="text-base font-medium">{ride.captain.fullname.firstname + " " + ride.captain.fullname.lastname}</h2>
            <h4 className="text-lg font-semibold">{ride.captain.vehicle.plate}</h4>
            <p className="text-sm font-medium text-gray-600">
              Maruti Suzuki Alto
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between flex-col gap-2">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-t border-gray-200">
              <i className="text-lg ri-map-pin-3-fill"></i>
              <div>
                <h3 className="text-lg font-medium">567/11-A</h3>
                <p className="text-sm font-medium -mt-1 text-gray-600">
                  {ride.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-t border-gray-200">
              <i className="text-lg ri-square-fill"></i>
              <div>
                <h3 className="text-lg font-medium">245/71-C</h3>
                <p className="text-sm font-medium -mt-1 text-gray-600">
                {ride.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-t border-gray-300">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride.fare}</h3>
                <p className="text-sm font-medium -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg">Make a Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
