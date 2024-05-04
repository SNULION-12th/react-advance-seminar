import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function VotePage() {
  const apikey =
      "live_NrBfxepuGPuuZQz3LVP52FdmItyWOY9m4ajeRG8nSHfJCSKNMOP1mqjiC2ATgAfZ";
  const navigate = useNavigate();
  const userId = getCookie("userId");


  const [thumbsUpImage, setThumbsUpImage] = useState(
      require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
      require("../assets/images/thumbs-down-icon.png")
  );
  const [currentImage,setCurrentImage] = useState([]
  );

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=1&size=big",
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apikey,
            },
          }
      );

      const data = response.data[0];
      setCurrentImage(data);

    } catch (error) {
      console.log(error);
    }
  };

  const vote = async (id,isUp) => {
    try {
      let voteValue = isUp ? 1 : -1;
      isUp? setThumbsUpImage(require("../assets/images/thumbs-up-click.png")) : setThumbsDownImage(require("../assets/images/thumbs-down-click.png"));
      const response = await axios.post(
          "https://api.thecatapi.com/v1/votes",
          {
            "image_id":id,
            "sub_id":userId,
            "value": voteValue},{
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apikey,
            },
          }
      );
      console.log(response);

      setTimeout(refreshVote,500);

    } catch (error) {
      console.log(error);
    }
  };

  const refreshVote = () => {
    getImage();
    setThumbsUpImage(require("../assets/images/thumbs-up-icon.png"));
    setThumbsDownImage(require("../assets/images/thumbs-down-icon.png"));
  }

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
                src = {currentImage.url}
                className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
            />
            <div className="w-1/3 flex gap-12 justify-center">
              <img
                  src={thumbsUpImage}
                  className="w-20 h-20 cursor-pointer"
                  onClick={() => {
                    vote(currentImage.id, true);
                  }}/>
              <img
                  src={thumbsDownImage}
                  className="w-20 h-20 cursor-pointer"
                  onClick={() => {
                    vote(currentImage.id, false);
                  }}/>

            </div>
          </div>
        </div>
      </div>
  )
      ;
}

export default VotePage;
