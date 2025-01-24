import { Flex, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import Btn from "components/button/button";
import useVideoController from "./videos.controller";
import VideosTableVimeo from "./table/table.vimeo";

const VimeoVideos: React.FC = () => {
  const { videos, selection, setSelection, generateLessons, loading } =
    useVideoController();

  console.log(videos);

  return (
    <VStack px={8} w="100%" align="flex-start" spaceY={8}>
      <TitlePage
        title="Adicione as aulas ao módulo"
        description="Selecione os vídeos e personalize os detalhes para garantir que seu conteúdo esteja completo e pronto para os alunos."
      />
      <VStack align="flex-start" w="100%" spaceY={4}>
        <VideosTableVimeo
          items={videos}
          selection={selection}
          setSelection={setSelection}
          onGenerateLessons={generateLessons}
          loading={loading}
        />
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
        <Btn onClick={generateLessons} label="Continuar" w="200px" />
      </Flex>
    </VStack>
  );
};

export default VimeoVideos;
