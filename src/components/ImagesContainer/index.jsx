import { useEffect } from "react";

function use(promise) {
  if (promise.status === "resolved") return promise.result;
  else if (promise.status === "rejected") throw promise.reason;
  else {
    promise.then(
      (value) => {
        promise.status = "resolved";
        promise.result = value;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}

export default function ImageContainer({ image, activator }) {
  const imageData = use(image);

  useEffect(() => {
    activator(false);
  }, [image]);

  return <img src={imageData.url ?? ""} className="w-full h-full" />;
}
