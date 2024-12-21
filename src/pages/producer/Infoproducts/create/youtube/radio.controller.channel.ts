import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useChannelController = () => {
  const [channel, setChannel] = useState("");
  const navigate = useNavigate();

  const onIntegrate = () => {
    if (channel === "youtube") {
      navigate("/infoproducts/create/youtube")
    } else if (channel === "vimeo") {
      console.log("vimeo");
    }
  };

  return {
    onIntegrate,
    navigate,
    setChannel,
    channel,
  };
};

export default useChannelController;
