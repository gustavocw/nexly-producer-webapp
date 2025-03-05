import { VStack, Text } from "@chakra-ui/react";
import Player from "components/player/player";
import MultipleVideos from "./multiple/multiple";
import UniqueVideo from "./unique/unique";
import useVideosStore from "stores/videos.store";
import TitlePage from "components/titlePage/titlePage";

const PreviewVideos = () => {
  const { videos, videoUrl, setVideoUrl, setVideos, setDuration } =
    useVideosStore();

  const clearVideos = () => {
    setVideoUrl(""), setVideos([]);
    setDuration("");
  };

  console.log(videoUrl);
  

  return (
    <VStack align="flex-start" px={8} w="100%">
      <TitlePage
        backParams={{ section: "modules" }}
        onAction={clearVideos}
        title="Video"
      />
      {videoUrl && videos?.length === 0 ? (
        <Player videoUrl={videoUrl || videos[0]?.urlVideo} />
      ) : (
        <VStack 
          w="100%" 
          h="600px" 
          my={2}
          align="center" 
          justify="center" 
          border="2px dashed gray" 
          borderRadius="md" 
          bg="neutral.60"
        >
          <Text fontSize="lg" color="gray.500">
            Aqui será o preview do vídeo adicionado.
          </Text>
        </VStack>
      )}
      {videos?.length > 1 ? <MultipleVideos /> : <UniqueVideo />}
    </VStack>
  );
};

export default PreviewVideos;
