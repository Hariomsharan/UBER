import { React, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import SearchingRide from "../components/SearchingRide";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [openpanel, setOpenpanel] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const searchingRidePanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const [vehiclepanelOpen, setVehiclepanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [searchingRidePanel, setSearchingRidePanel] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);

  const [fares, setFares] = useState({ auto: 0, car: 0, moto: 0 });
  const submitHendler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleInputChange = async (e, type) => {
    const value = e.target.value;
    if (type === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveInput(type);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/maps/get-suggestions?input=${value}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  useGSAP(() => {
    if (openpanel) {
      gsap.to(panelRef.current, {
        height: "75%",
        padding: "25px",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: "0px",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [openpanel]);

  useGSAP(() => {
    if (vehiclepanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclepanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (searchingRidePanel) {
      gsap.to(searchingRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(searchingRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [searchingRidePanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);

  const findTrip = async () => {
    setVehiclepanelOpen(true);
    setOpenpanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFares(response.data);
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRideDetails(response.data);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-6 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-screen w-full flex flex-col justify-end absolute top-0">
        <div className="h-[25%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setOpenpanel(false);
            }}
            className="absolute opacity-0 top-5 right-5 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHendler(e)}>
            <input
              onClick={() => setOpenpanel(true)}
              onChange={(e) => handleInputChange(e, "pickup")}
              value={pickup}
              className="bg-[#eee] px-10 py-2 w-full mt-5 rounded-lg text-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setOpenpanel(true)}
              onChange={(e) => handleInputChange(e, "destination")}
              value={destination}
              className="bg-[#eee] px-10 py-2 w-full rounded-lg text-lg mt-4"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white text-lg font-semibold w-full py-2 rounded-lg mt-5 "
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setPickup={setPickup}
            setDestination={setDestination}
            activeInput={activeInput}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-8 w-full translate-y-full"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          fares={fares}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-12 w-full translate-y-full"
      >
        <ConfirmRide
          setSearchingRidePanel={setSearchingRidePanel}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fares={fares}
        />
      </div>
      <div
        ref={searchingRidePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-12 w-full translate-y-full"
      >
        <SearchingRide
          pickup={pickup}
          destination={destination}
          fares={fares}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={waitingForDriverPanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-12 w-full"
      >
        <WaitingForDriver />
      </div>
    </div>
  );
};

export default Home;
