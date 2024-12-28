import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Input from "components/input/input";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/paginationVideo/pagination";
import Text from "components/text/text";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "components/ui/file-upload";
import usePreviewVideoController from "../preview.controller";
import { Controller } from "react-hook-form";
import Btn from "components/button/button";

const MultipleVideos = () => {
  const { control, errors, onSubmit, handleSubmit, pageRef, setPageRef } =
    usePreviewVideoController();

  const pages = 5;

  return (
    <VStack
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      p="20px"
      gap="20px"
      w="100%"
    >
      <HStack w="100%">
        <PaginationRoot count={pages} pageSize={1} defaultPage={1} w="100%">
          <HStack w="100%" justify="space-between" gap="4">
            <PaginationPageText format="long" flex="1" />

            {pageRef > 1 && (
              <PaginationPrevTrigger
                onClick={() => setPageRef(pageRef - 1)}
              />
            )}
            {pageRef < pages ? (
              <PaginationNextTrigger
                onClick={() => setPageRef(pageRef + 1)}
              />
            ) : (
              <Btn
                w="200px"
                label="Salvar"
                onClick={handleSubmit(onSubmit)}
              />
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
            name="title"
            placeholder="Título da aula"
            errorText={errors.title?.message}
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
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <FileUploadRoot
                gap={0}
                alignItems="stretch"
                maxFiles={1}
                onFileChange={(value) => {
                  const selectedFile = value.acceptedFiles[0];
                  field.onChange(selectedFile);
                  console.log(selectedFile);
                }}
              >
                <Text.Medium my="4px" fontSize="14px">
                  Thumbnail
                </Text.Medium>
                <FileUploadDropzone
                  cursor="pointer"
                  bg="#1C06284D"
                  color="neutral"
                  border="1px dashed"
                  borderColor="primary.50"
                  _icon={{
                    display: "none",
                  }}
                  label={
                    <VStack>
                      <Image src="/images/FileImage.svg" />
                      <Text.Medium fontSize="13px" display="flex" gap={1}>
                        Arraste uma imagem ou{" "}
                        <a style={{ color: "#5E84F1", cursor: "pointer" }}>
                          selecione manualmente
                        </a>
                      </Text.Medium>
                      <FileUploadList w="100px" />
                    </VStack>
                  }
                />
                <Flex my="4px" fontSize="12px">
                  {errors.thumbnail?.message ? (
                    <Text.Medium>{errors.thumbnail?.message}</Text.Medium>
                  ) : (
                    <Text.Medium fontSize="12px">
                      A imagem de logo deve estar no formato JPG ou PNG e
                      tamanho máximo de 5 MB. Dimensões ideais: 1.500 x 1.000
                      pixels.
                    </Text.Medium>
                  )}
                </Flex>
              </FileUploadRoot>
            )}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MultipleVideos;
