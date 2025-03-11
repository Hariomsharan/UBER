import { React, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import SearchingRide from "../components/SearchingRide";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";

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
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const submitHendler = (e) => {
    e.preventDefault();
    console.log("submit");
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
              onChange={(e) => setPickup(e.target.value)}
              value={pickup}
              className="bg-[#eee] px-10 py-2 w-full mt-5 rounded-lg text-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setOpenpanel(true)}
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              className="bg-[#eee] px-10 py-2 w-full rounded-lg text-lg mt-4"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setOpenpanel={setOpenpanel}
            setVehiclepanelOpen={setVehiclepanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-8 w-full translate-y-full"
      >
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-12 w-full translate-y-full"
      >
        <ConfirmRide setSearchingRidePanel={setSearchingRidePanel} />
      </div>
      <div
        ref={searchingRidePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 pt-12 w-full translate-y-full"
      >
        <SearchingRide />
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
