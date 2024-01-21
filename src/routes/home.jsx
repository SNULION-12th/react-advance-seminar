import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {

  const [images, setImages] = useState([]);

  useEffect(()=>{
    getImages();
  }, [])

  const getImages = async () => {
    try{
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=8', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z',
        }
      })

      const data = response.data;
      const imageSet = [];

      data.map((e) => {
        imageSet.push(e.url)
      })

      setImages(imageSet)
      console.log(imageSet)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="felx felx-col gap-5">
      <button
        onClick={()=>getImages()}
        className="w-24 h-24 border-4"
      >
        reload
      </button>
      <div className="grid grid-cols-3 gap-5">
        {images.map((img) => (
          <img src={img} className="object-contain w-full h-96 border-8"></img>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
