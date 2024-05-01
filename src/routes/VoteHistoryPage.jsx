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
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/votes?limit=8&order=DESC",
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
      <div className="absolute top-[5%] right-[16%] flex gap-5">
        <img
          src={require("../assets/images/favourite-history.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
          onClick={() => navigate("/favourite-history")}
        />
        <img
          src={require("../assets/images/vote-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
        <img
          src={require("../assets/images/history-icon-click.png")}
          className="w-14 h-14"
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-2/3 h-2/3 p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 auto-rows-[46%] gap-4 overflow-y-scroll hide-scroll scrollable-content">
          {images.map((img) => (
            <div className="w-full h-full relative">
              <img
                key={img.url}
                src={img.url}
                className={`object-cover w-full h-full border-[3px] border-[#FF6841] rounded-xl 
                ${
                  img.value > 0 ? "border-blue-500" : "border-red-500"
                }                `}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoteHistoryPage;
