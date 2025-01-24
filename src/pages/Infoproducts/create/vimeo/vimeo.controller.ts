import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getFolders } from "services/vimeo.services";
import useProductStore from "stores/product.store";
import { useNavigate } from "react-router-dom";

const useVimeoController = () => {
  const navigate = useNavigate();
  const [folder, setFolder] = useState<Folder | null>(null);
  const { productId } = useProductStore();

  const { data: folders, isLoading: loadingPlaylist } = useQuery<FoldersResponse>({
    queryKey: ["folders"],
    queryFn: () => getFolders(productId, "/me/projects"),
  });

  const onIntegrate = () => {
    if (folder) {
      navigate(`/infoproducts/create/vimeo/videos${folder.metadata.connections.folders.uri}`);
    }
  };

  return {
    folder,
    folders,
    onIntegrate,
    setFolder,
    loadingPlaylist,
  };
};

export default useVimeoController;
