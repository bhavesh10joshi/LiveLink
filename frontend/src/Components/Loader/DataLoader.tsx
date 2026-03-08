import Lottie from "lottie-react";
import Loader from "../ui/Lottie/Loader.json";

const LoaderData = () => {
  return (
    <div style={{ width: "500px", height: "500px" }} className="flex justify-center items-center">
      <Lottie 
        animationData={Loader} 
        loop={true} 
        autoplay={true} 
      />
    </div>
  );
};

// mt-[14rem] mr-[5rem]
export default LoaderData;