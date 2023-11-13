import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video py-[20%] px-[5%] absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="w-1/3 py-6">{overview}</p>
      <div>
        <button className="p-2 m-2 border-black rounded-lg bg-white w-32 hover:bg-opacity-80 text-black">
          {"▶"} Play
        </button>
        <button className="p-2 m-2 border-black rounded-lg bg-gray-600 w-36 hover:bg-opacity-80">
          {"ℹ️"} More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
