import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function HomePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      // ### TO DO ###
      // #############
    } catch (err) {
      console.log(err);
    }
  };

  const favouritingImage = async (imgId) => {
    try {
      // ### TO DO ###
      // #############
    } catch (err) {
      console.log(err);
    }
  };

  const unFavouritingImage = async (favouriteId) => {
    try {
      // ### TO DO ###
      // #############
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[15%] flex gap-8">
        <img
          src={require("../assets/images/favourite_history.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/favourite-history")}
        />
        <img
          src={require("../assets/images/vote-icon.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40"
      />
      <div className="w-2/3 h-2/3 relative p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 grid-rows-2 gap-4">
          {images.map((img) => (
            <div key={img.id} className="w-full h-full relative">
              <img
                src={img.url}
                className="object-cover w-full h-full border-2 border-[#FF6841] rounded-xl"
              />
              {img.isFavourite ? (
                <img
                  src={require("../assets/images/favourite-icon.png")}
                  className="w-8 h-8 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => unFavouritingImage(img.favouriteId)}
                />
              ) : (
                <img
                  src={require("../assets/images/unfavourite-icon.png")}
                  className="w-8 h-8 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => favouritingImage(img.id)}
                />
              )}
            </div>
          ))}
        </div>
        <img
          src={require("../assets/images/reload-icon.png")}
          className="w-10 h-10 absolute bottom-5 right-5 cursor-pointer"
          onClick={() => getImages()}
        />
      </div>
    </div>
  );
}

export default HomePage;
