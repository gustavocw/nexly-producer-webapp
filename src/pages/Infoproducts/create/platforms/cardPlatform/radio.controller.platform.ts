import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrlGoogle } from "services/google.services";

const usePlatformController = () => {
  const [platform, setPlatform] = useState("youtube");
  const navigate = useNavigate();

  const { refetch: fetchUrlGoogle } = useQuery({
    queryKey: ["youtube-url"],
    queryFn: () =>
      getUrlGoogle().then((res) => {
        console.log(res);
        window.open(res, "_blank");
      }),
    enabled: false,
  });

  const onIntegrate = () => {
    if (platform === "youtube") {
      fetchUrlGoogle();
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
