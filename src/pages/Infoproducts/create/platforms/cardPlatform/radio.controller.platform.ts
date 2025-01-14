import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIntegrationByCourse, getUrlGoogle } from "services/google.services";
import useProductStore from "stores/product.store";

const usePlatformController = () => {
  const [platform, setPlatform] = useState("youtube");
  const { productId } = useProductStore();
  const navigate = useNavigate();

  const { refetch: confirmPlatform, isLoading: loadingConfirm } = useQuery({
    queryKey: ["integration-by-id"],
    queryFn: () =>
      getIntegrationByCourse(productId).then((res) => {
        console.log(res);
        if (res?.youtube === true) {
          navigate("/infoproducts/create/youtube")
        } else {
          fetchUrlGoogle()
        }
      }),
    enabled: false,
  });

  const { refetch: fetchUrlGoogle, isLoading: loadingUrl } = useQuery({
    queryKey: ["youtube-url"],
    queryFn: () =>
      getUrlGoogle().then((res) => {
        window.open(res, "_blank");
      }),
    enabled: false,
  });

  const onIntegrate = () => {
    if (platform === "youtube") {
      confirmPlatform();
    } else if (platform === "vimeo") {
      console.log("vimeo");
    }
  };

  return {
    onIntegrate,
    navigate,
    setPlatform,
    loadingConfirm,
    loadingUrl,
    confirmPlatform,
  };
};

export default usePlatformController;
