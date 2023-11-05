import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidaData } from "../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef();
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const onButtonClick = () => {
    const message = checkValidaData(
      email.current.value,
      name.current.value,
      password.current.value
    );
    setErrorMessage(message);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-white text-3xl py-4 ">
          {isSignIn ? "Sign In" : "Sign Out"}
        </h1>
        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="p-4 my-4 bg-gray-700 w-full rounded-md"
        />
        {!isSignIn && (
          <input
            type="text"
            ref={name}
            placeholder="Enter Full Name"
            className="p-4 my-4 bg-gray-700 w-full rounded-md"
          />
        )}
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 bg-gray-700 w-full rounded-md"
        />
        <p className="text-red-500 font-bold ">
          {errorMessage != null ? `*${errorMessage}` : ""}
        </p>
        <button
          className="p-4 my-6 border-black bg-red-800 text-white w-full rounded-md"
          onClick={onButtonClick}
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>
        <p
          className="py-4 text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignIn
            ? "New to Netflix? Sign up now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
