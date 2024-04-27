import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function FavouriteHistoryPage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/favourites?sub_id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_a6rGagP4ePU6MEwhRA7BBDTCiBkYUJIOfUWnWQcUBknj6OPRemH5Op58AKTsT1T2",
          },
        }
      );

      const data = response.data;
      const imageSet = [];

      data.map((e) => {
        imageSet.push({
          id: e.image.id,
          url: e.image.url,
          isFavourite: true,
          favouriteId: e.id,
        });
      });

      setImages(imageSet);
    } catch (err) {
      console.log(err);
    }
  };

  const favouritingImage = async (imgId) => {
    try {
      const response = await axios.post(
        "https://api.thecatapi.com/v1/favourites",
        {
          image_id: imgId,
          sub_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_a6rGagP4ePU6MEwhRA7BBDTCiBkYUJIOfUWnWQcUBknj6OPRemH5Op58AKTsT1T2",
          },
        }
      );

      const newImages = [...images];
      const idx = newImages.findIndex((e) => e.id === imgId);
      newImages[idx].isFavourite = true;
      newImages[idx].favouriteId = response.data.id;

      setImages(newImages);
    } catch (err) {
      console.log(err);
    }
  };

  const unFavouritingImage = async (favouriteId) => {
    try {
      const newImages = [...images];
      const idx = newImages.findIndex((e) => e.favouriteId === favouriteId);
      newImages[idx].isFavourite = false;
      newImages[idx].favouriteId = null;

      setImages(newImages);

      const response = await axios.delete(
        `https://api.thecatapi.com/v1/favourites/${favouriteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_a6rGagP4ePU6MEwhRA7BBDTCiBkYUJIOfUWnWQcUBknj6OPRemH5Op58AKTsT1T2",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[16%] flex gap-5">
        <img
          src={require("../assets/images/favourite-history-click.png")}
          className="w-[3.8rem] h-[3.8rem]"
        />
        <img
          src={require("../assets/images/vote-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
        <img
          src={require("../assets/images/history-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote-history")}
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-2/3 h-2/3 relative p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 auto-rows-[46%] gap-4 overflow-y-scroll hide-scroll scrollable-content">
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
      </div>
    </div>
  );
}

export default FavouriteHistoryPage;
