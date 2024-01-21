import axios from "axios";
import { useEffect, useState } from "react";

function HistoryPage() {
  const [images, setImages] = useState([]);

  useEffect(()=>{
    getImages();
  }, [])

  const getImages = async () => {
    try{
      const response = await axios.get('https://api.thecatapi.com/v1/votes?limit=8&order=DESC', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z',
        }
      })

      const data = response.data;
      const imageSet = [];

      data.map((e) => {
        imageSet.push({
            url: e.image.url,
            value: e.value,
        })
      })

      setImages(imageSet)
      console.log(imageSet)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="felx felx-col gap-5">
      Voted Images
      <div className="grid grid-cols-3 gap-5">
        {images.map((img) => (
          <img src={img.url} className={`object-contain w-full h-96 border-8 ${img.value < 0 ? 'border-red-600' : 'border-blue-600'}`}></img>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;