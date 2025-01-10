import { VStack } from "@chakra-ui/react";
import Player from "components/player/player";
import MultipleVideos from "./multiple/multiple";
import UniqueVideo from "./unique/unique";
import useVideosStore from "stores/videos.store";
import TitlePage from "components/titlePage/titlePage";

const PreviewVideos = () => {
  const { videos, videoUrl, setVideoUrl, setVideos, setDuration } = useVideosStore();

  const clearVideos = () => {
    setVideoUrl(""),
    setVideos([])
    setDuration("")
  }

  return (
    <VStack align="flex-start" px={8} w="100%">
      <TitlePage onClick={clearVideos} title="Video" />
      <Player videoUrl={videoUrl || videos[0]?.url} />
      {videos?.length > 1 ? <MultipleVideos /> : <UniqueVideo />}
    </VStack>
  );
};

export default PreviewVideos;
