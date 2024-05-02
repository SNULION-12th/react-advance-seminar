import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CatWorldCup() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]); // 모든 매치를 저장
  const [selectedBreeds, setSelectedBreeds] = useState([]); // 사용자가 선택한 고양이를 저장
  const [currentRound, setCurrentRound] = useState(1); // 현재 라운드
  const [tournamentStatus, setTournamentStatus] = useState(""); // 토너먼트 진행 상태

  useEffect(() => {
    initializeMatch();
  }, []);

  const initializeMatch = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/breeds",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_YfxU8th0smc3bKeDWgPuxA8FYmTBxp6ZL6BYSjEW3hUrFA4j9c1kAWUO1iYOBlKW",
          },
        }
      );
  
      const breeds = response.data;
      const breedMap = [];

      breeds.forEach((breed) => {
        if (breed.image && breed.image.id && breed.image.url) {
          if (!breedMap[breed.name]) {
            breedMap[breed.name] = {
              id: breed.image.id,
              url: breed.image.url,
              breedId: breed.id,
              breedName: breed.name,
            };
          };
        };
      });

      const getRandomBreed = () => {
        const breedNames = Object.keys(breedMap);
        const randomIndex = Math.floor(Math.random() * breedNames.length);
        const randomBreedName = breedNames[randomIndex];
        const randomBreed = breedMap[randomBreedName];
        delete breedMap[randomBreedName];
        return randomBreed;
      };
      
      const selectedBreeds = [];

      for (let i = 0; i < 16; i++) {
        selectedBreeds.push(getRandomBreed());
      }

      setSelectedBreeds(selectedBreeds); // 16개의 고양이 선택
    } catch (err) {
      console.log(err);
    }
  };

  // 두 데이터씩 짝짓기
  const generateMatches = (selectedBreeds) => {
    const matches = [];
    for (let i = 0; i < selectedBreeds.length; i += 2) {
      matches.push([selectedBreeds[i], selectedBreeds[i + 1]]);
    }
    return matches;
    console.log(matches)
  };

  const matchingBreeds = generateMatches(selectedBreeds)
  const firstMatches = matchingBreeds[0]
  console.log(firstMatches);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      {/* Header */}
      <div className="absolute top-[5%] right-[16%] flex gap-5">
      <img
          src={require("../assets/images/category-icon-click.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
          onClick={() => navigate("/advanced")}
        />
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
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40 cursor-pointer"
        onClick={() => navigate("/")}
        alt="Cat Icon"
      />
      <div className="w-2/3 h-2/3 relative p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        {firstMatches.length === 2 && (
          <div className="w-full h-3/4 grid grid-cols-2 auto-rows-[46%] gap-4">
            <div key={firstMatches[0].id} className="w-full h-full relative">
              <img
                src={firstMatches[0].url}
                className="object-cover w-full h-full border-2 border-[#FF6841] rounded-xl cursor-pointer"
                alt={firstMatches[0].breedName}
              />
            </div>
            <div key={firstMatches[1].id} className="w-full h-full relative">
              <img
                src={firstMatches[1].url}
                className="object-cover w-full h-full border-2 border-[#FF6841] rounded-xl cursor-pointer"
                alt={firstMatches[1].breedName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default CatWorldCup;
