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
        `https://api.thecatapi.com/v1/votes?sub_id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_nMUTSoIPj5jfOKAjm6EE2DAkj36djwOvTJw5TIMrdkoICBORccT00uQ2K2tDQ9Sq",
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
      <div className="w-2/3 h-2/3 p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-3/4 grid grid-cols-4 auto-rows-[46%] gap-4 overflow-y-scroll hide-scroll scrollable-content">
          {images.map((img) => (
            <div className="w-full h-full relative">
              <img
                key={img.url}
                src={img.url}
                className={`object-cover w-full h-full rounded-xl ${
                  img.value === 1
                    ? "border-[3px] border-blue-500"
                    : "border-[3px] border-orange-500"
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
