import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function VotePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");

  const [image, setImage] = useState({
    id: null,
    url: null,
    isFavourite: null,
    favouriteId: null,
  });

  const [thumbsUpImage, setThumbsUpImage] = useState(
    require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
    require("../assets/images/thumbs-down-icon.png")
  );

  const handleClick = (e) => {
    const image = e.target;
    image.style.transform = "scale(0.8)";

    setTimeout(() => {
      image.style.transform = "scale(1)";
    }, 300);
  };

  const handleThumbsUpHover = (e) => {
    setThumbsUpImage(require("../assets/images/thumbs-up-click.png"));
  };

  const handleThumbsUpLeave = (e) => {
    setThumbsUpImage(require("../assets/images/thumbs-up-icon.png"));
  };

  const handleThumbsDownHover = (e) => {
    setThumbsDownImage(require("../assets/images/thumbs-down-click.png"));
  };

  const handleThumbsDownLeave = (e) => {
    setThumbsDownImage(require("../assets/images/thumbs-down-icon.png"));
  };

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      // ### TO DO ###
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1&size=thumb",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_qseohf5Rv9Fr2U9LGEyjunIXYLEKkMCMALtqv1H8b4i8fWrQ60QI0JRY1F51WwZk",
          },
        }
      );

      const data = response.data;

      setImage({
        id: data[0].id,
        url: data[0].url,
        isFavourite: false,
        favouriteId: null,
      });
      // #############
    } catch (err) {
      console.log(err);
    }
  };

  const vote = async (val) => {
    try {
      // ### TO DO ###
      const response = await axios.post(
        "https://api.thecatapi.com/v1/votes",
        {
          image_id: image.id,
          sub_id: userId,
          value: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_qseohf5Rv9Fr2U9LGEyjunIXYLEKkMCMALtqv1H8b4i8fWrQ60QI0JRY1F51WwZk",
          },
        }
      );

      // response를 어디에 쓰지?
      const data = response.data;

      console.log(data.value);

      // #############
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
          src={require("../assets/images/vote-icon-click.png")}
          className="w-14 h-14 "
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
      <div className="w-2/3 h-2/3 py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-[90%] flex justify-evenly items-center">
          <img
            // ### ONE CAT IMAGE ###
            src={image.url}
            className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
          />
          <div className="w-1/3 flex gap-12 justify-center">
            <img
              src={thumbsUpImage}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsUpImage Event ###
              onClick={(e) => {
                vote(1);
                handleClick(e);
                getImage();
              }}
              onMouseEnter={handleThumbsUpHover}
              onMouseLeave={handleThumbsUpLeave}
            />
            <img
              src={thumbsDownImage}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsDownImage Event ###
              onClick={(e) => {
                vote(-1);
                handleClick(e);
                getImage();
              }}
              onMouseEnter={handleThumbsDownHover}
              onMouseLeave={handleThumbsDownLeave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotePage;
