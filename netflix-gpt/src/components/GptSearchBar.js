import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data?.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // const gptQuery =
    //   "Act as a Movie Recommendation system and suggest some movies for the query" +
    //   searchText.current.value +
    //   ". Only give me name of 5 movies , comma seperated like the example result given ahead. Example Result : Sholay, Don, Dhamaal, Golmaal, Dus";
    // // Make an API call to GPT API and get movie results
    // try {
    //   // Make sure the OpenAI library is initialized correctly
    //   const gptResults = await openai.ChatCompletion.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: gptQuery }],
    //   });

    //   console.log(gptResults.data.choices);
    // } catch (error) {
    //   console.error(error);
    // }
    const dummyMovies = [
      "Golmaal Returns",
      "Dhamaal",
      "Lust Stories",
      "Sholay",
      "Masti",
      "Raaz",
    ];

    const promiseArray = dummyMovies.map((movie) => searchMovieTMDB(movie));

    const tmbdResults = await Promise.all(promiseArray);

    console.log(tmbdResults);
    dispatch(
      addGptMovieResult({
        movieNames: dummyMovies,
        movieResults: tmbdResults,
      })
    );
  };
  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-6 md:col-span-8 p-4 m-4"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-4 md:col-span-4 bg-red-700 text-white py-2 px-4 m-4 rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
