import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemsVimeo } from "services/vimeo.services";
import useProductStore from "stores/product.store";
import useVideosStore from "stores/videos.store";

const useVideoController = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const { "*": uri } = useParams<{ "*": string }>();
  const { productId, moduleId } = useProductStore();
  const { setVideos } = useVideosStore();
  const navigate = useNavigate();

  const { data: videos, isLoading: loading } = useQuery({
    queryKey: ["videos-vimeo", uri],
    queryFn: () => getItemsVimeo(productId, uri),
  });

  const generateLessons = () => {
    if (!videos || selection.length === 0) return;

    const lessons: any = videos.data
      .filter((item: any) => selection.includes(item.video.uri))
      .map((item: any) => ({
        lessonLengh: item.video.duration,
        description: item.video.description || "Edit this description",
        nameLesson: item.video.name,
        duration: item.video.duration,
        idLessonYt: item.video.uri,
        urlVideo: item.video.link,
      }));

    setVideos(lessons);
    navigate(`/infoproducts/create/video/${moduleId}`);
  };

  return {
    videos,
    selection,
    setSelection,
    generateLessons,
    loading,
  };
};

export default useVideoController;
