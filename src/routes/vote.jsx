import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VotePage() {

    const navigate = useNavigate();
    const [image, setImage] = useState({});

    useEffect(()=>{
        getImage();
    },[])

    const getImage = async () => {
        try{
            const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z',
                }
            });
            const data = response.data[0];
            setImage({
                id: data.id,
                url: data.url,
            });
            console.log(data)
        } catch(err) {
            console.log(err);
        }
    }

    const vote = async (val) => {
        try{
            const response = await axios.post('https://api.thecatapi.com/v1/votes', {
                "image_id": image.id,
                "value": val
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'live_GKblu8slVg2fFDula9hfgUUWLXlaX6aCWLZpv8pAyFb6Cyhxzq9CkhlwW88Erb0z',
                }
            });
            console.log(response);
            getImage();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="flex gap-5">
                <button 
                    className="w-20 h-20 border-4 border-indigo"
                    onClick={()=>getImage()}
                >
                    reload
                </button>
                <button 
                    className="w-20 h-20 border-4 border-indigo"
                    onClick={()=>vote(1)}
                >
                    VoteUp
                </button>
                <button 
                    className="w-20 h-20 border-4 border-indigo"
                    onClick={()=>vote(-1)}
                >
                    VoteDown
                </button>
                <button 
                    className="w-20 h-20 border-4 border-indigo"
                    onClick={()=>navigate('/history')}
                >
                    History
                </button>
            </div>
            <img src={image.url} className="w-96 h-96"></img>
        </div>
    );
}

export default VotePage;