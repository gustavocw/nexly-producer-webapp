import { VStack } from "@chakra-ui/react";
import Player from "components/player/player";
import MultipleVideos from "./multiple/multiple";

const PreviewVideos = () => {
  return (
    <VStack px={8} w="100%">
      <Player />
      <MultipleVideos />
    </VStack>
  );
};

export default PreviewVideos;
