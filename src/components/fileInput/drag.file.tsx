import React from "react";
import { VStack, Image } from "@chakra-ui/react";
import Text from "components/text/text";
import {
  FileUploadDropzone,
  FileUploadRoot,
} from "components/ui/file-upload";

interface DragFileProps {
  maxFiles?: number;
  label?: string;
  hint?: string;
  width?: any;
  onFileSelect: (file: File) => void;
  value?: any;
}

export const DragFile: React.FC<DragFileProps> = ({
  label = "",
  hint = "A imagem deve estar no formato JPG ou PNG e tamanho máximo de 5 MB. Dimensões ideais: 1.500 x 1.000 pixels.",
  onFileSelect,
  width = "50%",
  value,
}) => {

  return (
    <FileUploadRoot
      w={width}
      gap={0}
      maxW="100%"
      alignItems="stretch"
      maxFiles={1}
      onFileAccept={(file) => {
        if (file.files.length > 0) {
          onFileSelect(file.files[0]);
        }
      }}
    >
      <Text.Medium my="4px" fontSize="14px" fontWeight="medium">
        {label}
      </Text.Medium>
      <FileUploadDropzone
        cursor="pointer"
        bg="transparent"
        color="neutral"
        border="1px dashed"
        borderColor="neutral.30"
        _icon={{
          display: "none",
        }}
        label={
          <VStack py={10}>
            <Image
              w={value ? "100px" : "30px"}
              src={
                value instanceof File
                  ? URL.createObjectURL(value)
                  : value || "/images/FileImage.svg"
              }              alt="File upload icon"
              objectFit="contain"
            />
            <Text.Medium
              whiteSpace="nowrap"
              fontSize="11px"
              mx={2}
              display="flex"
              gap={1}
              fontWeight="medium"
            >
              Arraste uma imagem ou{" "}
              <a style={{ color: "#5E84F1", cursor: "pointer" }}>
                selecione manualmente
              </a>
            </Text.Medium>
          </VStack>
        }
      />
      <Text.Medium my="4px" fontSize="12px" fontWeight="medium">
        {hint}
      </Text.Medium>
    </FileUploadRoot>
  );
};
