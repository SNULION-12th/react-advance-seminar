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
          src={require("../assets/images/vote-icon.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
        <img
          src={require("../assets/images/favourite_history.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/favourite-history")}
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
                className={`object-cover w-full h-full border-[3px] border-[#FF6841] rounded-xl ${
                  // ### FILL ME ###
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
