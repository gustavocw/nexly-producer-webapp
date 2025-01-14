import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylists } from "services/videos.services";
import useProductStore from "stores/product.store";

const usePlaylistsController = () => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const navigate = useNavigate();
  const {id: idChannel} = useParams();
  const { productId } = useProductStore();

  const { data: playlists, isLoading: loadingPlaylist } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(productId, idChannel),
  });

  const onIntegrate = () => {
    if (playlist) {
      if (playlist.id) {
        navigate(`/infoproducts/create/youtube/videos/${playlist.id}`);
      }
    }
  };

  return {
    onIntegrate,
    setPlaylist,
    loadingPlaylist,
    playlists,
    playlist,
  };
};

export default usePlaylistsController;
