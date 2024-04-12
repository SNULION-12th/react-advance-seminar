import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function VotePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");

  const [thumbsUpImage, setThumbsUpImage] = useState(
    require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
    require("../assets/images/thumbs-down-icon.png")
  );

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      // ### TO DO ###
      // #############
    } catch (err) {
      console.log(err);
    }
  };

  const vote = async (val) => {
    try {
      // ### TO DO ###
      // #############
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[15%] flex gap-8">
        <img
          src={require("../assets/images/history-icon.png")}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate("/vote-history")}
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
      <div className="w-2/3 h-2/3 py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-[90%] flex justify-evenly items-center">
          <img
            // ### ONE CAT IMAGE ###
            className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
          />
          <div className="w-1/3 flex gap-12 justify-center">
            <img
              src={thumbsUpImage}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsUpImage Event ###
            />
            <img
              src={thumbsDownImage}
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
