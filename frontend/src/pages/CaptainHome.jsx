import { React, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RideNotifications from "../components/RideNotifications";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../Context/captainContext";
import { SocketContext } from "../Context/socketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null)

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          
          
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 1000);
    updateLocation();

    // return () => clearInterval(locationInterval);
  }, []);

  socket.on('new-ride', (data) => {
    console.log(data)
    setRide(data)
    setRidePopupPanel(true)
  })

  const confirmRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id,
        
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="relative">
        <img
          className="w-16 absolute left-6 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to={"/captain/logout"}
          className="fixed flex items-center justify-center h-10 w-10 bg-white rounded-full right-2 top-2"
        >
          <i className="text-lg font-semibold ri-logout-circle-r-line"></i>
        </Link>
      </div>

      <div className="h-full">
      <LiveTracking />
      </div>
      <div className="h-[30%] w-full p-4 absolute bg-white bottom-0">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-4 w-full translate-y-full"
      >
        <RideNotifications
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={ConfirmRidePopupPanelRef}
        className="fixed z-10 h-screen bg-white bottom-0 px-3 py-6 pt-4 w-full translate-y-full"
      >
        <ConfirmRidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;