import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChannelsYt, getUrlGoogle } from "services/google.services";
import useProductStore from "stores/product.store";

const useChannelController = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
    const { productId } = useProductStore();
  const navigate = useNavigate();

  const { data: channels, isLoading: loadingChannels } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsYt(productId),
  });
  

  const { refetch: fetchUrlGoogle, isLoading: loadingUrl } = useQuery({
    queryKey: ["google-url"],
    queryFn: () =>
      getUrlGoogle().then((res) => {
        window.open(res, "_self");
      }),
    enabled: false,
  });


  const onIntegrate = () => {
    if (channel) {
      if (channel.id) {
        navigate(`/infoproducts/create/youtube/playlists/${channel.id}`);
      }
    }
  };

  return {
    onIntegrate,
    loadingUrl,
    channels,
    loadingChannels,
    setChannel,
    fetchUrlGoogle,
    channel,
  };
};

export default useChannelController;
