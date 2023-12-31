import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    // Fetch data from TMDB API and update store
    // it's necessary to pass API_OPTIONS here while fetching
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    !nowPlaying && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
