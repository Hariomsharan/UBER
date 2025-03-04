import { React, useState } from 'react'
import { Link } from 'react-router-dom';

const Captainsignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      firstName,
      lastName,
      email,
      password,
    });
    console.log(setCaptainData);
    setFirstName(""), setLastName(""), setEmail("");
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
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] outline-[#767676] rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] outline-[#767676] rounded-md border px-4 py-2 w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>
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
            SignUp
          </button>
        </form>
        <div className="flex flex-col">
          <p>
            Already have a account?
            <Link to="/captain-login" className="text-blue-600 font-medium">
            login
            </Link>
          </p>
          <p>
            Signup as a User?
            <Link to="/signup" className="text-blue-600 font-medium">
              signup
            </Link>
          </p>
        </div>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default Captainsignup