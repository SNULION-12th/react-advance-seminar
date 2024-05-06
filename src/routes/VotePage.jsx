import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function VotePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");
  const [image, setImage] = useState({});

  const [thumbsUpImage, setThumbsUpImage] = useState(
    require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
    require("../assets/images/thumbs-down-icon.png")
  );

  useEffect(() => {
    getImage();
  }, []);

  const handleThumbsUpHover = () => {
    setThumbsUpImage(require("../assets/images/thumbs-up-click.png"));
  };

  const handleThumbsUpLeave = () => {
    setThumbsUpImage(require("../assets/images/thumbs-up-icon.png"));
  };

  const handleThumbsDownHover = () => {
    setThumbsDownImage(require("../assets/images/thumbs-down-click.png"));
  };

  const handleThumbsDownLeave = () => {
    setThumbsDownImage(require("../assets/images/thumbs-down-icon.png"));
  };

  const getImage = async () => {
    try {
      // ### TO DO ###
      // #############
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1&size=large",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z",
          },
        }
      );

      const data = response.data;
      setImage(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const vote = async (val) => {
    try {
      // ### TO DO ###
      // #############
      await axios.post(
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
              "live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z",
          },
        }
      );

      window.location.reload();
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
            src={image.url}
            className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
          />
          <div className="w-1/3 flex gap-12 justify-center">
            <img
              src={thumbsUpImage}
              onMouseEnter={() => handleThumbsUpHover()}
              onMouseLeave={() => handleThumbsUpLeave()}
              onClick={() => vote(1)}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsUpImage Event ###
            />
            <img
              src={thumbsDownImage}
              onMouseEnter={() => handleThumbsDownHover()}
              onMouseLeave={() => handleThumbsDownLeave()}
              onClick={() => vote(-1)}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsDownImage Event ###
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotePage;
