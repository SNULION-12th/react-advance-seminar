import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdvancedAssignment = () => {
  const navigate = useNavigate();
  const [breed, setBreed] = useState(0);
  const [breedFacts, setBreedFacts] = useState({});

  useEffect(() => {
    getBreedFacts();
  }, []);

  /* const getBreed = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?size=med",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_E2HfG1CwoZpsPFqao4D4Tc62pb9LSmDEgY6L5NyMBpvYRv9b2F570XUepEUWWtqO",
          },
        }
      );

      const data = response.data[0];
      setVoteImg({
        id: data.id,
        url: data.url,
        isFavourite: false,
        favouriteId: null,
      });
    } catch (err) {
      console.log(err);
    }
  };*/

  const getBreedFacts = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/breeds/3",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_E2HfG1CwoZpsPFqao4D4Tc62pb9LSmDEgY6L5NyMBpvYRv9b2F570XUepEUWWtqO",
          },
        }
      );

      const data = response.data;
      console.log(data);

      /*  setBreedFacts({
        name: data.name,
        weight: data.weight,
        height: data.height,
        life_span: data.life_span,
        bred_for: data.bred_for,
        breed_group: data.breed_group,
      });*/
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[16%] flex gap-5">
        <img
          src={require("../assets/images/free-icon-book-828370.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
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
      />
      <div className="w-2/3 h-2/3 relative p-5 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center">
        <img
          src={require("../assets/images/reload-icon.png")}
          className="w-10 h-10 absolute bottom-5 right-5 cursor-pointer"
          onClick={() => {
            getBreedFacts();
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedAssignment;
