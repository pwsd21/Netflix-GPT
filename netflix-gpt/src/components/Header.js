import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { gptSearchToggle } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const langSelect = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties - store will be updated with the details of user
        const { uid, email, displayName, photoURL } = user;
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
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        // ...
        navigate("/");
      }
    });

    //unSubscribe when component unmounts
    return () => unSubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(gptSearchToggle());
  };

  const handleLanguageSelect = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-48 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex cursor-pointer">
          {langSelect && (
            <select
              className="h-1/2 m-6 p-2 text-white bg-black"
              onChange={handleLanguageSelect}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="h-1/2 my-6 p-2 rounded-lg text-white bg-purple-700"
            onClick={handleGptSearchClick}
          >
            {langSelect ? "Home" : "GPT Search"}
          </button>
          <img
            className="h-16 m-4 rounded-full"
            src={user?.photoURL}
            alt="Logo"
          />
          <button className="font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
