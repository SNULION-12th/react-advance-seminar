import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

function AdvancedAssignment2() {
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
          breedId: null,
        });
      });

      setImages(imageSet);
    } catch (err) {
      console.log(err);
    }
  };

  const showBreeds = async (imgId) => {
    try {
      const response = await axios.post(
        `https://api.thecatapi.com/v1/breeds/${imgId}`,
        {
          image_id: imgId,
          sub_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_s8THUNELdFSI3QCGOqdLma1oDX6xn1bdVBF7PNh3XCvgZ3QipWHLoeH0uxylvk3l",
          },
        }
      );
      const data = response.data;
      console.log(data.name);
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
        {images.map((img) => (
            <div key={img.id} className="w-full h-full relative">
              <img
                src={img.url}
                className="object-cover w-full h-full border-2 border-[#FF6841] rounded-xl"
              />    
        </div>
  ))}
      </div>
      </div>
      );
      }
export default AdvancedAssignment2;
