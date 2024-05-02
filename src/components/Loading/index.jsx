import { useState, useEffect } from "react";

export default function Loading({ activator }) {
  const [loadingImage, setLoadingImage] = useState(
    require("../../assets/images/cat-icon.jpg")
  );

  useEffect(() => activator(true), []);

  return (
    <div
      className={
        "w-full h-full flex items-center justify-center loading-rotate"
      }
    >
      <img className={"w-24"} src={loadingImage} alt="" />
    </div>
  );
}
