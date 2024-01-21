import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="w-24 h-24 border-4"
                onClick={()=>navigate('/home')}
            >
                Click to Home!
            </button>
            <button
                className="w-24 h-24 border-4"
                onClick={()=>navigate('/vote')}
            >
                Click to Vote!
            </button>
            <button
                className="w-24 h-24 border-4"
                onClick={()=>navigate('/history')}
            >
                Click to History!
            </button>
        </div>
    );
}

export default MainPage;