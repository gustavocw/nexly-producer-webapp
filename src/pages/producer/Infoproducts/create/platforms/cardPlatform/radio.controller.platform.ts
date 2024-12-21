import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePlatformController = () => {
  const [platform, setPlatform] = useState("youtube");
  const navigate = useNavigate();

  const onIntegrate = () => {
    if (platform === "youtube") {
      navigate("/infoproducts/create/youtube")
    } else if (platform === "vimeo") {
      console.log("vimeo");
    }
  };

  return {
    onIntegrate,
    navigate,
    setPlatform,
  };
};

export default usePlatformController;
