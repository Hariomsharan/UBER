import { React, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [openpanel, setOpenpanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

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
          <LocationSearchPanel />
        </div>
      </div>
      <div className="fixed z-10 bg-white bottom-0 px-3 py-8 w-full translate-y-full">
        <div className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between">
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
          <h2 className="text-xl font-semibold">₹190.20</h2>
        </div>
        <div className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between">
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
          <h2 className="text-xl font-semibold">₹60.20</h2>
        </div>
        <div className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between">
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
            <p className="font-light text-sm">Comfortable sedans, top quelity drivers</p>
          </div>
          <h2 className="text-xl font-semibold">₹200.20</h2>
        </div>
        <div className="flex w-full p-3 border-2 mb-2 active:border-black bg-gray-200 rounded-lg items-center justify-between">
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
          <h2 className="text-xl font-semibold">₹100.20</h2>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
