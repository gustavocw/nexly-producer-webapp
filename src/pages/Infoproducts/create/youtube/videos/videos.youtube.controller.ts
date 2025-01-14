import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVideosYoutube } from "services/videos.services";
import useProductStore from "stores/product.store";
import useVideosStore from "stores/videos.store";

const useVideoController = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const { id: idPlaylist } = useParams();
  const { productId, moduleId } = useProductStore();
  const { setVideos } = useVideosStore();
  const navigate = useNavigate();

  const { data: videos } = useQuery({
    queryKey: ["videos-youtube"],
    queryFn: () => getVideosYoutube(productId, moduleId, idPlaylist),
  });

  const generateLessons = () => {
    if (!videos?.items || selection.length === 0) return;

    const lessons: any = videos.items
      .filter((item) => selection.includes(item.id))
      .map((item) => ({
        lessonLengh: item.contentDetails.videoPublishedAt,
        description: item.snippet.description,
        nameLesson: item.snippet.title,
        duration: "00:00:00",
        idLessonYt: item.id,
        urlVideo: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
      }));

    setVideos(lessons);
    navigate(`/infoproducts/create/video/${moduleId}`);
  };

  return {
    videos,
    selection,
    setSelection,
    generateLessons,
  };
};

export default useVideoController;
