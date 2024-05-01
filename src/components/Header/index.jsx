import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  // return (
  //   <div className="absolute top-[5%] right-[16%] flex gap-5">
  //     <img
  //       src={require("../../assets/images/cat-icon.jpg")}
  //       className="w-44 h-40"
  //     />
  //     <img
  //       alt="image"
  //       src={require("../../assets/images/favourite-history.png")}
  //       className="w-[3.8rem] h-[3.8rem] cursor-pointer"
  //       onClick={() => navigate("/favourite-history")}
  //     />
  //     <img
  //       src={require("../../assets/images/vote-icon.png")}
  //       className="w-14 h-14 cursor-pointer"
  //       onClick={() => navigate("/vote")}
  //     />
  //     <img
  //       src={require("../../assets/images/history-icon.png")}
  //       className="w-14 h-14 cursor-pointer"
  //       onClick={() => navigate("/vote-hsistory")}
  //     />
  //     <img
  //       src={require("../../assets/images/info-icon.png")}
  //       className="w-14 h-14 cursor-pointer"
  //       onClick={() => navigate("/advanced")}
  //     />
  //   </div>
  // );
  return (
    <div className="relative w-full h-36">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
        <img
          src={require("../../assets/images/cat-icon.jpg")}
          onClick={() => navigate("/")}
          className="w-44 h-40"
        />
      </div>
      <div className="absolute top-5 right-16 flex gap-5">
        <img
          alt="favourite-history"
          src={require("../../assets/images/favourite-history.png")}
          className="w-[3.8rem] h-[3.8rem] cursor-pointer"
          onClick={() => navigate("/favourite-history")}
        />
        <img
          alt="vote-icon"
          src={require("../../assets/images/vote-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote")}
        />
        <img
          alt="history-icon"
          src={require("../../assets/images/history-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/vote-history")}
        />
        <img
          alt="info-icon"
          src={require("../../assets/images/info-icon.png")}
          className="w-14 h-14 cursor-pointer"
          onClick={() => navigate("/advanced")}
        />
      </div>
    </div>
  );
};

export default Header;
