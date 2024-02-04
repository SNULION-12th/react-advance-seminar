import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

function VoteHistoryPage() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(getCookie("userId"));

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    console.log(userId);
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/votes?limit=100&order=DESC&sub_id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z",
          },
        }
      );

      const data = response.data;
      console.log(data);
      const imageSet = [];

      data.map((e) => {
        imageSet.push({
          url: e.image.url,
          value: e.value,
        });
      });

      setImages(imageSet);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[15%] flex gap-8">
        <img
          src={require("../assets/images/vote-icon.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
        <img
          src={require("../assets/images/home-icon.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.png")}
        className="w-44 h-32"
      />
      <div className="w-2/3 h-2/3 p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 auto-rows-[46%] gap-4 overflow-y-scroll">
          {images.map((img) => (
            <div className="w-full h-full relative">
              <img
                key={img.url}
                src={img.url}
                className={`object-cover w-full h-full border-2 border-[#FF6841] rounded-xl ${
                  img.value < 0 ? "border-red-600" : "border-blue-600"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoteHistoryPage;
