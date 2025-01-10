import { Box, HStack, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Input from "components/input/input";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/paginationVideo/pagination";
import usePreviewVideoController from "../preview.controller";
import Btn from "components/button/button";
import useVideosStore from "stores/videos.store";
import { DragFile } from "components/fileInput/drag.file";

const MultipleVideos = () => {
  const {
    control,
    errors,
    onSubmit,
    handleSubmit,
    pageRef,
    setPageRef,
    playNextVideo,
    playPreviousVideo,
  } = usePreviewVideoController();
  const { videos } = useVideosStore();

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
                  playPreviousVideo();
                  setPageRef(pageRef - 1);
                }}
              />
            )}

            {pageRef < videos?.length ? (
              <PaginationNextTrigger
                onClick={() => {
                  setPageRef(pageRef + 1);
                  playNextVideo();
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
        <VStack pt={1} alignItems="flex-start" w="70%">
          <Input.Base
            label="Título"
            control={control}
            name="name"
            placeholder="Título da aula"
            errorText={errors.name?.message}
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
          onFileSelect={(file) => console.log(file)}
        />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MultipleVideos;
