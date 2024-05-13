// Modal.js
import React from "react";
import "../App.css";

const Modal = ({ isOpen, onClose, isCorrect, answerCatBreeds }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content flex justify-center items-center">
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
        <div className="font-bold">
          <p
            className={`text-xl ${
              isCorrect === "정답입니다! 다음 문제를 풀어보세요!"
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {isCorrect}
          </p>
          <br />
          <br />
          {answerCatBreeds.name ? (
            <>
              <p className="text-lg text-orange-600">품종 설명👇</p>
              <br />
              <p>품종 이름 : {answerCatBreeds.name}</p>
              <p>품종 무게 : {answerCatBreeds.weight.metric}kg</p>
              <p>품종 출생지 : {answerCatBreeds.origin}</p>
              <p>품종 수명 : {answerCatBreeds.life_span}</p>
              <br />
              <p>
                더 알고싶다면? 👉{" "}
                <a
                  href={answerCatBreeds.wikipedia_url}
                  target="_blank"
                  className="text-purple-600"
                >
                  위키피디아로 가기
                </a>
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
