import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

function AdvancedAssignment() {
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
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?has_breeds=true&size=small&limit=8",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_s8THUNELdFSI3QCGOqdLma1oDX6xn1bdVBF7PNh3XCvgZ3QipWHLoeH0uxylvk3l",
          },
        }
      );
      const data = response.data;
      const imageSet = [];

      data.map((e) => {
        imageSet.push({
          id: e.id,
          url: e.url,
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
          onClick={() => navigate("/vote-history")}
        />
        <img
          src={require("../assets/images/after-cat.png")}
          className="w-14 h-14 cursor-pointer"
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-2/3 h-2/3 relative p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 grid-rows-2 gap-4">
          <img
            className="object-cover w-full h-full border-2 border-[#FF6841] rounded-xl"
            onClick={() => navigate("/breedsfact")}
          >
            Beng
          </img>
        </div>
      </div>
      <img
        src={require("../assets/images/reload-icon.png")}
        className="w-10 h-10 absolute bottom-5 right-5 cursor-pointer"
        onClick={() => getImages()}
      />
    </div>
  );
}

export default AdvancedAssignment;
