import {
  Flex,
  HStack,
  Icon,
  Image,
  Tabs,
  VStack,
  parseColor,
} from "@chakra-ui/react";
import Input from "components/input/input";
import { useCreateAreaController } from "./form.controller";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Text from "components/text/text";
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} from "components/ui/color-picker";

import {
  FileUploadList,
  FileUploadDropzone,
  FileUploadRoot,
} from "components/ui/file-upload";
import { swatches } from "./swatches";

const FormArea = () => {
  const { control, errors } = useCreateAreaController();
  return (
    <VStack spaceY={5} align="flex-start" w="100%">
      <Flex alignItems="center" gap="6px">
        <Tabs.Trigger value="areas">
          <Icon color="neutral">
            <KeyboardArrowLeftIcon />
          </Icon>
          <Text.Medium fontSize="16px" color="neutral">
            Cirar área de membros
          </Text.Medium>
        </Tabs.Trigger>
      </Flex>
      <Flex w="60%" gap={2} justify="space-between" alignItems="center">
        <Input.Base
          control={control}
          label="Nome da área"
          name="name"
          placeholder="Nome da área de membros"
          errorText={errors.name?.message}
          isRequired
          width="100%"
        />
        <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px">
          <ColorPickerLabel color="neutral">Cor primária</ColorPickerLabel>
          <ColorPickerControl>
            <ColorPickerInput borderColor="neutral.30" color="neutral" p={2} />
            <ColorPickerTrigger borderColor="neutral.30" />
          </ColorPickerControl>
          <ColorPickerContent>
            <ColorPickerArea />
            <HStack>
              <ColorPickerEyeDropper />
              <ColorPickerSliders />
            </HStack>
            <ColorPickerSwatchGroup>
              {swatches.map((item) => (
                <ColorPickerSwatchTrigger
                  swatchSize="4.5"
                  key={item}
                  value={item}
                />
              ))}
            </ColorPickerSwatchGroup>
          </ColorPickerContent>
        </ColorPickerRoot>
      </Flex>
      <Input.Base
        control={control}
        label="Domínio"
        name="domain"
        placeholder="Domnínio personalizado"
        errorText={errors.domain?.message}
        isRequired
        width="60%"
      />
      <Flex gap="2" w="60%" justify="space-between">
        <FileUploadRoot
          w="50%"
          gap={0}
          maxW="100%"
          alignItems="stretch"
          maxFiles={1}
        >
          <Text.Medium my="4px" fontSize="14px">
            Background da área
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
          <Text.Medium my="4px" fontSize="12px">
            A imagem deve estar no formato JPG ou PNG e tamanho máximo de 5 MB.
            Dimensões ideais: 1.500 x 1.000 pixels.
          </Text.Medium>
        </FileUploadRoot>
        <FileUploadRoot
          w="50%"
          gap={0}
          maxW="100%"
          alignItems="stretch"
          maxFiles={1}
        >
          <Text.Medium my="4px" fontSize="14px">
            Logo da área
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
          <Text.Medium my="4px" fontSize="12px">
            A imagem deve estar no formato JPG ou PNG e tamanho máximo de 5 MB.
            Dimensões ideais: 1.500 x 1.000 pixels.
          </Text.Medium>
        </FileUploadRoot>
      </Flex>
    </VStack>
  );
};

export default FormArea;
