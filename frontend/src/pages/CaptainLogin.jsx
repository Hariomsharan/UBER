import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../Context/captainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );

    console.log(response);

    if (response.status === 200) {
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }

    console.log(captainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-14 mb-7"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] outline-[#767676] mb-5 rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] outline-[#767676] mb-5 rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
          />
          <button className="bg-black text-white font-semibold mb-1 rounded-md border px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/captain-signup" className="text-blue-600 font-medium">
            signup
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#fbb14a] flex items-center justify-center text-white font-semibold mt-4 mb-3 rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Signin as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
