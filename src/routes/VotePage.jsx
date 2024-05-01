import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function VotePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");

  const [thumbsUpClass, setThumbsUpClass] = useState("thumbsUp");
  const [thumbsDownClass, setThumbsDownClass] = useState("thumbsDown");
  const originalThumbsUp = require("../assets/images/thumbs-up-icon.png");
  const hoverThumbsUp = require("../assets/images/thumbs-up-click.png"); // 마우스 호버 시 보여질 이미지
  const originalThumbsDown = require("../assets/images/thumbs-down-icon.png");
  const hoverThumbsDown = require("../assets/images/thumbs-down-click.png"); // 동일한 'haha' 이미지를 사용

  const handleThumbsUpHover = () => {
    setThumbsUpImage(hoverThumbsUp); // 마우스 호버 시 이미지 변경
  };

  const handleThumbsUpLeave = () => {
    setThumbsUpImage(originalThumbsUp); // 마우스가 떠났을 때 원래 이미지로 복원
  };

  const handleThumbsDownHover = () => {
    setThumbsDownImage(hoverThumbsDown); // 마우스 호버 시 이미지 변경
  };

  const handleThumbsDownLeave = () => {
    setThumbsDownImage(originalThumbsDown); // 마우스가 떠났을 때 원래 이미지로 복원
  };

  const [thumbsUpImage, setThumbsUpImage] = useState(
    require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
    require("../assets/images/thumbs-down-icon.png")
  );
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const getImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1&size=small",
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

      if (Array.isArray(data)) {
        data.forEach((e) => {
          imageSet.push({
            id: e.id,
            url: e.url,
            isFavourite: false,
            favouriteId: null,
          });
        });
      } else {
        imageSet.push({
          id: data.id,
          url: data.url,
          isFavourite: false,
          favouriteId: null,
        });
      }

      // 첫 번째 이미지의 URL을 설정합니다.
      if (imageSet.length > 0) {
        setImageUrl(imageSet[0].url);
        setImageId(imageSet[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImage(); // 컴포넌트가 마운트될 때 이미지를 불러옵니다.
  }, []);

  const vote = async (val) => {
    try {
      const response = await axios.post(
        "https://api.thecatapi.com/v1/votes",
        {
          image_id: imageId,
          sub_id: userId,
          value: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_nMUTSoIPj5jfOKAjm6EE2DAkj36djwOvTJw5TIMrdkoICBORccT00uQ2K2tDQ9Sq",
          },
        }
      );
      console.log("Vote response:", response);
      console.log(response.status);
      if (response.status === 201) {
        getImage(); // Call to fetch new image
      } else {
        console.error("Failed to post vote:", response);
      }
    } catch (err) {
      console.log("Error during voting:", err);
    }
  };
  // 콘솔에 찍어보기.
  useEffect(() => {
    if (imageId) {
      console.log("Current Image ID:", imageId);
    }
  }, [imageId]); // imageId가 변경될 때만 이 effect를 실행

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="w-2/3 h-2/3 py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-[90%] flex justify-evenly items-center">
          <img
            src={imageUrl}
            alt="Cat"
            className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
          />
          <div className="w-1/3 flex gap-12 justify-center">
            <img
              src={thumbsUpImage}
              className="w-20 h-20 cursor-pointer"
              onMouseEnter={handleThumbsUpHover}
              onMouseLeave={handleThumbsUpLeave}
              onClick={() => vote(1)}
            />
            <img
              src={thumbsDownImage}
              className="w-20 h-20 cursor-pointer"
              onMouseEnter={handleThumbsDownHover}
              onMouseLeave={handleThumbsDownLeave}
              onClick={() => vote(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotePage;
