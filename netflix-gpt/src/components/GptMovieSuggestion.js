import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovies, gptSearchList } = gpt;

  if (!gptMovies) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {gptSearchList?.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={gptMovies[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
