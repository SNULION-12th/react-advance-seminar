import axios from "axios";
import { useEffect, useState } from "react";

const AdvancedAssignment = () => {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      let num = Math.random() * 29;
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds?limit=1&page=${num}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_a6rGagP4ePU6MEwhRA7BBDTCiBkYUJIOfUWnWQcUBknj6OPRemH5Op58AKTsT1T2",
          },
        }
      );

      const fetched = response.data[0];
      setImage({
        id: fetched.id,
        url: fetched.image.url,
      });
      setDesc({
        name: fetched.name,
        temperament: fetched.temperament,
        origin: fetched.origin,
        description: fetched.description,
        life_span: fetched.life_span,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="absolute top-[5%] right-[16%] flex gap-5">
        <img
          src={require("../assets/images/favourite-history.png")}
          className="w-[3.8rem] h-[3.8rem]"
        />
        <img
          src={require("../assets/images/vote-icon.png")}
          className="w-14 h-14 "
        />
        <img
          src={require("../assets/images/history-icon.png")}
          className="w-14 h-14"
        />
      </div>
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40"
      />
      <div className="w-2/3 h-2/3 py-2 border-4 rounded-2xl border-[#FF6841] flex justify-center items-center flex-col relative">
        <div className="w-full h-[90%] flex justify-evenly items-center">
          <img
            src={image ? image.url : null}
            className="w-7/12 h-full border-[3px] rounded-xl border-[#FF6841]"
          />
          <ul className="w-1/3 justify-center leading-7 list-disc ml-5">
            <li>
              <b className="font-semibold">Name:</b> {desc ? desc.name : null}
            </li>
            <li>
              <b className="font-semibold">Temperament:</b>{" "}
              {desc ? desc.temperament : null}
            </li>
            <li>
              <b className="font-semibold">Origin:</b>{" "}
              {desc ? desc.origin : null}
            </li>
            <li>
              <b className="font-semibold">Description:</b>{" "}
              {desc ? desc.description : null}
            </li>
            <li>
              <b className="font-semibold">Life span:</b>{" "}
              {desc ? desc.life_span : null}
            </li>
          </ul>
        </div>
        <div className="absolute right-5 bottom-5">
          <img
            src={require("../assets/images/reload-icon.png")}
            className="w-10 h-10 cursor-pointer"
            onClick={() => getImage()}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAssignment;
