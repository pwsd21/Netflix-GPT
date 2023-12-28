import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidaData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { APP_BACKGROUND, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const onButtonClick = () => {
    const message = checkValidaData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      // signup logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // Update store
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("*User Not Found");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen md:h-auto object-cover"
          src={APP_BACKGROUND}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-full md:w-3/12 p-3 md:p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80"
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
          {errorMessage != null ? `${errorMessage}` : ""}
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
          {isSignIn ? (
            <p>
              <span className="text-gray-400">New to Netflix? </span> Sign up
              now
            </p>
          ) : (
            <p>
              <span className="text-gray-400">Already Registered? </span> Sign
              In Now
            </p>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
