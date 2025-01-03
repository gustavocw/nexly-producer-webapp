import { Flex, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import VideosTable from "./table/table.youtube.videos";
import Btn from "components/button/button";
import { Group } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/ui/pagination";

interface VideoItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    name: "Video 1",
    description: "This is the first video description.",
    imageUrl: "/images/dark.png",
  },
  {
    id: "2",
    name: "Video 2",
    description: "This is the second video description.",
    imageUrl: "/images/dark.png",
  },
  {
    id: "3",
    name: "Video 3",
    description: "This is the third video description.",
    imageUrl: "/images/dark.png",
  },
];

const YoutubeVideos: React.FC = () => {
  return (
    <VStack px={8} w="100%" align="flex-start" spaceY={8}>
      <TitlePage
        title="Adicione as aulas ao módulo"
        description="Selecione os vídeos e personalize os detalhes para garantir que seu conteúdo esteja completo e pronto para os alunos."
      />
      <VStack align="flex-start" w="100%" spaceY={4}>
        <VideosTable items={videos} />
      </VStack>
      <Flex
        alignItems="center"
        w="100%"
        justify="flex-end"
        bg="neutral.60"
        right={0}
        p={3}
        position="absolute"
        bottom={0}
        gap="20px"
      >
        <PaginationRoot count={10} pageSize={2} defaultPage={1} variant="solid">
          <Group attached>
            <PaginationPrevTrigger borderColor="neutral.40" />
            <PaginationItems  color="neutral" />
            <PaginationNextTrigger />
          </Group>
        </PaginationRoot>
        <Btn label="Continuar" w="200px" />
      </Flex>
    </VStack>
  );
};

export default YoutubeVideos;
