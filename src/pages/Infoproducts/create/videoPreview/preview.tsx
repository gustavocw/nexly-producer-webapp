import { VStack } from "@chakra-ui/react";
import Player from "components/player/player";
import MultipleVideos from "./multiple/multiple";
import UniqueVideo from "./unique/unique";
import useVideosStore from "stores/videos.store";
import { useEffect } from "react";

const PreviewVideos = () => {
  const { setVideos, videos, videoUrl } = useVideosStore();

  const videosData = [
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/watch?v=ABY_vPdYcYU",
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://www.youtube.com/watch?v=V3ADK6gsDGg",
    },
    {
      id: 3,
      title: "Video 3",
      url: "https://www.youtube.com/watch?v=6X5krhF4RdA",
    },
    {
      id: 4,
      title: "Video 3",
      url: "https://www.youtube.com/watch?v=bpOSxM0rNPM",
    },
    {
      id: 5,
      title: "Video 3",
      url: "https://www.youtube.com/watch?v=YIIw_v7tGj0",
    },
  ];

  useEffect(() => {
    if (!videos?.length) {
      setVideos(videosData);
    }
  }, []);

  return (
    <VStack px={8} w="100%">
      <Player videoUrl={videoUrl || videos[0]?.url} />
      {videos?.length > 2 ? (
        <MultipleVideos />
      ) : (
        <UniqueVideo video={videos[0]} />
      )}
    </VStack>
  );
};

export default PreviewVideos;
