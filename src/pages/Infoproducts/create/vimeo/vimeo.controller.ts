import { useQuery } from "@tanstack/react-query";
import { getFolders } from "services/vimeo.services";
import useProductStore from "stores/product.store";

const useVimeoController = () => {
  // const navigate = useNavigate();
  const { productId } = useProductStore();

  const { data: folders, isLoading: loadingPlaylist } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getFolders(productId),
  });

  const onIntegrate = () => {
    // if (playlist) {
    //   if (playlist.id) {
    //     navigate(`/infoproducts/create/youtube/videos/${playlist.id}`);
    //   }
    // }
  };

  return {
    folders,
    onIntegrate,
    loadingPlaylist,
  };
};

export default useVimeoController;
