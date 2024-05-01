import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdvancedAssignment = () => {
  const navigate = useNavigate();
  const getInfo = async () => {
    try {
      const response = await axios.get();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <img
        src={require("../assets/images/cat-icon.jpg")}
        className="w-44 h-40"
      />
    </div>
  );
};

export default AdvancedAssignment;
