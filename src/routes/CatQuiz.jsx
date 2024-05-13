import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import "../App.css";
import Modal from "../utils/Modal";
import LoadingSpinner from "../utils/LoadingSpinner";
function AdoptionPage() {
  const navigate = useNavigate();
  const userId = getCookie("userId");
  // Cat api로 하나의 고양이 이미지 src를 저장하는 상태
  const [VotingCatImg, setVotingCatImg] = useState("");

  // 랜덤한 4개 고양이 품종(오답 3개 정답 1개)
  const [randomFourBreeds, setRandomFourBreeds] = useState([]);

  // 고양이 품종 정답
  const [CatBreeds, setCatBreeds] = useState("");

  // 정답 고양이 정보
  const [answerCatBreeds, setAnswerCatBreeds] = useState({});

  // 마우스 오버 됐는지 아닌지
  const [onMouseOver, setOnMouseOver] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [isCorrect, setIsCorrect] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getImage();
    randomGetBreeds();
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

  const randomGetBreeds = async () => {
    let breeds = [];
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=true",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_vYsLJ5vtokEDeWKZoBc9DT2vWuDWmGwiDFcuwXwfLNnguwpw6n36lzZHknj5kSdU",
          },
        }
      );
      const answer = response.data[0].breeds[0].name;
      breeds.push(answer);
      setCatBreeds(answer);
      setAnswerCatBreeds(response.data[0].breeds[0]);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=3&has_breeds=true",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_vYsLJ5vtokEDeWKZoBc9DT2vWuDWmGwiDFcuwXwfLNnguwpw6n36lzZHknj5kSdU",
          },
        }
      );

      const randomBreeds = [
        response.data[0].breeds[0].name,
        response.data[1].breeds[0].name,
        response.data[2].breeds[0].name,
      ];
      breeds.push(...randomBreeds);
    } catch (error) {
      console.log(error);
    }
    setRandomFourBreeds(getRandomElements(breeds, breeds.length));
  };

  // 배열 요소 랜덤하게 섞기
  function getRandomElements(array, numberOfElementsToExtract) {
    let randomElements = [];
    let arrayCopy = array.slice(0); // 배열 복사

    while (
      randomElements.length < numberOfElementsToExtract &&
      arrayCopy.length > 0
    ) {
      let randomIndex = Math.floor(Math.random() * arrayCopy.length);
      let randomElement = arrayCopy.splice(randomIndex, 1)[0]; // 배열에서 요소 제거 후 추출
      randomElements.push(randomElement);
    }

    return randomElements;
  }

  const onHandleOnMouseOver = (num) => {
    setOnMouseOver({ ...onMouseOver, [num]: true });
  };

  const onHandleOnMouseLeave = (num) => {
    setOnMouseOver({ ...onMouseOver, [num]: false });
  };

  const onClickAnswer = (breed) => {
    if (breed === CatBreeds) {
      openModal();
      setIsCorrect("정답입니다! 다음 문제를 풀어보세요!");
    } else {
      openModal();
      setIsCorrect("오답입니다! 다시 풀어보세요!");
    }
  };

  const onNextBtn = () => {
    setRandomFourBreeds([]);
    getImage();
    randomGetBreeds();
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
          src={require("../assets/images/history-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote-history")}
        />
        <img
          src={require("../assets/images/CatQuiz-click.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
          onClick={() => navigate("/CatQuiz")}
        />
      </div>
      <div className="w-2/3 h-[56%] py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        {randomFourBreeds.length === 4 ? (
          <>
            <div className="w-[50%] h-[90%] flex justify-evenly items-center">
              <img
                src={VotingCatImg}
                className="w-full h-full border-[3px] rounded-xl border-[#FF6841]"
              />
            </div>
            <div className="w-[25%] h-[90%] ml-28 flex justify-center flex-col font-bold">
              {randomFourBreeds.map((breed, i) => (
                <div
                  className={`w-full mt-10 h-[13%] p-1 border-4 rounded-2xl border-[#FF6841] text-center leading-8 cursor-pointer ${
                    onMouseOver[String(i)] ? "bg-[#FF6841]" : ""
                  }`}
                  onMouseOver={() => {
                    onHandleOnMouseOver(String(i));
                  }}
                  onMouseLeave={() => {
                    onHandleOnMouseLeave(String(i));
                  }}
                  onClick={() => {
                    onClickAnswer(breed);
                  }}
                  key={i}
                >
                  {breed}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <LoadingSpinner />
          </>
        )}
      </div>
      <span
        className={`w-[15%] h-[7%] py-2 border-4 rounded-2xl border-[#FF6841] text-center leading-8 font-bold cursor-pointer ${
          onMouseOver["4"] ? "bg-[#FF6841]" : ""
        }`}
        onMouseOver={() => {
          onHandleOnMouseOver("4");
        }}
        onMouseLeave={() => {
          onHandleOnMouseLeave("4");
        }}
        onClick={onNextBtn}
      >
        다음 문제 풀기
      </span>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        isCorrect={isCorrect}
        answerCatBreeds={
          isCorrect === "정답입니다! 다음 문제를 풀어보세요!"
            ? answerCatBreeds
            : ""
        }
      />
    </div>
  );
}

export default AdoptionPage;
