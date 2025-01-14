import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useChannelController = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const navigate = useNavigate();

  const onIntegrate = () => {
    console.log(channel);

    if (channel) {
      if (channel.id) {
        navigate(`/infoproducts/create/youtube/playlists/${channel.id}`);
      }
    }
  };

  return {
    onIntegrate,
    setChannel,
    channel,
  };
};

export default useChannelController;
