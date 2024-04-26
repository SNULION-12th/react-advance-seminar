import { useState } from "react";
import { setCookie } from "../utils/cookie";

function RegisterPage() {
  const [id, setId] = useState();

  return (
    <div className="w-full h-screen bg-[#fc9377] flex justify-center items-center">
      <div className="w-3/5 h-4/5 pt-8 pb-11 px-3 mt-4 mb-4 bg-white rounded-md flex flex-col justify-between items-center">
        <div className="w-full flex flex-row justify-end items-center">
          <img
            src={require("../assets/images/cat-icon.jpg")}
            className="w-36 h-32 mr-6"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-8">
          <div className="text-5xl text-[#FF6841] font-IBMPlexFont font-bold">
            사용자명을 입력해주세요
          </div>
          <input
            className="w-3/5 h-16 rounded-2xl px-3 py-2 bg-[#fce5d8] shadow-inner text-center text-xl focus:outline-none focus:border-orange-500 focus:ring-orange-500 focus:ring-2"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <button
          className="w-44 h-16 bg-[#ff7f5e] rounded-2xl mb-4 text-2xl text-center text-white font-IBMPlexFont font-bold"
          onClick={() => {
            setCookie("userId", id);
            window.location.reload();
          }}
        >
          입력하기
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
