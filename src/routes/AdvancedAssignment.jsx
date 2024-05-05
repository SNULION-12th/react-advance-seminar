import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AdvancedAssignment = () => {
  const [information, setInformation] = useState([]);
  const [randomInfo, setRandomInfo] = useState(null);
  const getInfo = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/breeds?limit=10&page=0",

        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_nMUTSoIPj5jfOKAjm6EE2DAkj36djwOvTJw5TIMrdkoICBORccT00uQ2K2tDQ9Sq",
          },
        }
      );

      const data = response.data;
      const newInformation = [];

      if (Array.isArray(data)) {
        data.forEach((e) => {
          newInformation.push({
            id: e.id,
            name: e.name,
            url: e.image.url,
            temperament: e.temperament,
          });
        });
      } else {
        console.log(data);
      }
      setInformation(newInformation);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInfo(); // 컴포넌트 마운트 시 정보 로딩
    console.log(information);
  }, []);

  useEffect(() => {
    if (information.length > 0) {
      const randomIndex = Math.floor(Math.random() * information.length);
      setRandomInfo(information[randomIndex]);
      console.log(randomIndex);
    }
  }, [information]); // 정보 배열이 업데이트 될 때마다 랜덤 정보를 업데이트

  if (!randomInfo) {
    return <div>Loading...</div>; // randomInfo가 없으면 로딩 표시
  }

  const buttons = (temperaments) => {
    return temperaments.split(", ").map((temperament) => (
      <div
        key={temperament}
        className="text-3xl bg-orange-600 text-[#ffc5b6] font-IBMPlexFont font-bold border-x-2 border-orange-600 rounded-full px-4 py-2 my-px"
      >
        {/* 색칠 범위 넓히는 건 border 써야 하는구나 */}
        {temperament}
      </div>
    ));
  };
  return (
    <div className="pt-16">
      <div className="flex justify-center w-full my-10">
        <p className="text-5xl font-IBMPlexFont justify-center font-bold text-[#000000]">
          Today's Cat Is...
        </p>
      </div>
      <div className="w-full flex flex-row justify-center gap-10 scroll-my-44">
        <div>
          <div key={randomInfo.id} />
          <p className="text-4xl font-IBMPlexFont font-bold text-[#ff9d84]">
            {randomInfo.name}
          </p>
          <img src={randomInfo.url} alt={randomInfo.name} width={300} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="my-px">{buttons(randomInfo.temperament)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAssignment;
