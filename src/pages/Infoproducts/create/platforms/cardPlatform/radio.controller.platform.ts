import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIntegrationByCourse, getUrlGoogle } from "services/google.services";
import { getVimeoUrl } from "services/vimeo.services";
import useProductStore from "stores/product.store";

const usePlatformController = () => {
  const [platform, setPlatform] = useState<string | null>("youtube");
  const { productId } = useProductStore();
  const navigate = useNavigate();

  const { refetch: confirmPlatform, isLoading: loadingConfirm } = useQuery({
    queryKey: ["integration-by-id"],
    queryFn: () =>
      getIntegrationByCourse(productId).then((res) => {
        if (platform === "youtube") {
          if (res?.youtube === true) {
            navigate("/infoproducts/create/youtube");
          } else if (res?.youtube === false) {
            fetchUrlYouTube();
          }
        } else if (platform === "vimeo") {
          if (res?.vimeo === true) {
            navigate("/infoproducts/create/vimeo");
          } else if (res?.vimeo === false) {
            fetchUrlVimeo();
          }
        } else {
          fetchUrlGoogle();
        }
      }),
    enabled: false,
  });

  const { refetch: fetchUrlGoogle, isLoading: loadingUrl } = useQuery({
    queryKey: ["google-url"],
    queryFn: () =>
      getUrlGoogle().then((res) => {
        window.open(res, "_self");
      }),
    enabled: false,
  });

  const { refetch: fetchUrlVimeo, isLoading: loadingVimeoUrl } = useQuery({
    queryKey: ["vimeo-url"],
    queryFn: () =>
      getVimeoUrl().then((res) => {
        window.open(res, "_blank");
      }),
    enabled: false,
  });

  const { refetch: fetchUrlYouTube, isLoading: loadingYouTubeUrl } = useQuery({
    queryKey: ["youtube-url"],
    queryFn: () =>
      getUrlGoogle().then((res) => {
        window.open(res, "_blank");
      }),
    enabled: false,
  });

  const onIntegrate = () => {
    if (!platform) {
      alert("Por favor, selecione uma plataforma antes de continuar.");
      return;
    }
    confirmPlatform();
  };

  return {
    onIntegrate,
    setPlatform,
    platform,
    loadingConfirm,
    loadingUrl,
    loadingVimeoUrl,
    loadingYouTubeUrl,
  };
};

export default usePlatformController;
