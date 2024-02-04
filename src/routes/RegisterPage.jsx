import { useState } from "react";
import { setCookie } from "../utils/cookie";

function RegisterPage() {
  const [id, setId] = useState();

  return (
    <div className="w-full h-screen bg-[#fc9377] flex justify-center items-center">
      <div className="w-3/5 h-4/5 py-8 px-3 bg-white rounded-md flex flex-col justify-between items-center">
        <div className="w-full flex flex-row justify-end items-center">
          <div className="text-3xl text-[#FF6841] font-IBMPlexFont font-bold">
            랜덤 고양이 생성기
          </div>
          <img src={require("../assets/images/cat-icon.png")} />
        </div>
        <div className="w-full flex flex-col items-center gap-10">
          <div className="text-5xl text-[#FF6841] font-IBMPlexFont font-bold">
            사용자명을 입력해주세요
          </div>
          <input
            className="w-3/5 h-16 rounded-full bg-[#fce5d8] shadow-inner"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <button
          className="w-44 h-16 bg-[#ff7f5e] rounded-2xl text-2xl text-white font-IBMPlexFont font-bold"
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
