import { Box, HStack, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Input from "components/input/input";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/paginationVideo/pagination";
import Btn from "components/button/button";
import useVideosStore from "stores/videos.store";
import { DragFile } from "components/fileInput/drag.file";
import useMultipleVideoController from "./multiple.controller";

const MultipleVideos = () => {
  const {
    control,
    errors,
    onSubmit,
    handleSubmit,
    pageRef,
    setFile,
    file,
    goToVideo,
  } = useMultipleVideoController();
  const { videos } = useVideosStore();

  console.log(videos);
  

  return (
    <VStack
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      p="20px"
      gap="20px"
      w="100%"
    >
      <HStack w="100%">
        <PaginationRoot
          count={videos?.length}
          pageSize={1}
          defaultPage={1}
          w="100%"
        >
          <HStack w="100%" justify="space-between" gap="4">
            <PaginationPageText format="long" flex="1" />
            {pageRef > 0 && (
              <PaginationPrevTrigger
                onClick={() => {
                  goToVideo(pageRef - 2);
                }}
              />
            )}

            {pageRef < videos?.length ? (
              <PaginationNextTrigger
                onClick={() => {
                  goToVideo(pageRef);
                }}
              />
            ) : (
              <Btn w="200px" label="Salvar" onClick={handleSubmit(onSubmit)} />
            )}
          </HStack>
        </PaginationRoot>
      </HStack>

      <Divider width="100%" />

      <HStack align="flex-start" w="100%">
        <VStack gap="32px" pt={2} alignItems="flex-start" w="70%">
          <Input.Base
            label="Título"
            control={control}
            name="nameLesson"
            placeholder="Título da aula"
            errorText={errors.nameLesson?.message}
            isRequired
          />
          <Input.Text
            label="Descrição"
            control={control}
            name="description"
            placeholder="Descrição da aula"
            errorText={errors.description?.message}
            isRequired
          />
        </VStack>
        <Box>
          <DragFile
            width="100%"
            label="Thumbnail"
            onFileSelect={(file) => setFile(file)}
            value={
              file ||
              (typeof videos[pageRef - 1]?.thumbnail === "string"
                ? videos[pageRef - 1]?.thumbnail
                : null)
            }
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MultipleVideos;
