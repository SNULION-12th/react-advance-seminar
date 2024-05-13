import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import LoadingSpinner from "../utils/LoadingSpinner";

function VotePage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");
  // Cat api로 하나의 고양이 이미지 src를 저장하는 상태
  const [VotingCatImg, setVotingCatImg] = useState("");

  const [thumbsUpImage, setThumbsUpImage] = useState(
    require("../assets/images/thumbs-up-icon.png")
  );
  const [thumbsDownImage, setThumbsDownImage] = useState(
    require("../assets/images/thumbs-down-icon.png")
  );

  useEffect(() => {
    getImage();
  }, []);

  // 고양이 이미지 가져오기
  const getImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1&size=small",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_vYsLJ5vtokEDeWKZoBc9DT2vWuDWmGwiDFcuwXwfLNnguwpw6n36lzZHknj5kSdU",
          },
        }
      );
      const VotingCatImgUrl = response.data[0].url;
      setVotingCatImg(VotingCatImgUrl);
    } catch (err) {
      console.log(err);
    }
  };

  // 엄지 클릭하면 vote api 실행
  const vote = async (val) => {
    try {
      let voteCount = Number(localStorage.getItem("voteCount"));
      const response = await axios.post(
        `https://api.thecatapi.com/v1/votes`,
        {
          image_id: String(voteCount),
          sub_id: userId,
          value: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_vYsLJ5vtokEDeWKZoBc9DT2vWuDWmGwiDFcuwXwfLNnguwpw6n36lzZHknj5kSdU",
          },
        }
      );
      voteCount++;
      localStorage.setItem("voteCount", voteCount);
      window.location.reload();
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
        <img
          src={require("../assets/images/CatQuiz-icon.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
          onClick={() => navigate("/CatQuiz")}
        />
      </div>
      <div className="w-2/3 h-2/3 py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <div className="w-full h-[90%] flex justify-evenly items-center">
          {VotingCatImg ? (
            <img
              src={VotingCatImg}
              className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841]"
            />
          ) : (
            <div className="w-3/5 h-full border-[3px] rounded-xl border-[#FF6841] flex justify-center justify-items-center relative">
              <LoadingSpinner />
            </div>
          )}
          <div className="w-1/3 flex gap-12 justify-center">
            <img
              src={thumbsUpImage}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsUpImage Event ###
              onMouseOver={handleThumbsUpHover}
              onMouseLeave={handleThumbsUpLeave}
              onClick={() => {
                vote(1);
              }}
            />
            <img
              src={thumbsDownImage}
              className="w-20 h-20 cursor-pointer"
              // ### thumbsDownImage Event ###
              onMouseOver={handleThumbsDownHover}
              onMouseLeave={handleThumbsDownLeave}
              onClick={() => {
                vote(-1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotePage;
