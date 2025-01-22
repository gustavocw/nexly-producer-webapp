import { Flex, HStack, Icon, Tabs, VStack, parseColor } from "@chakra-ui/react";
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
import { swatches } from "./swatches";
import { DragFile } from "components/fileInput/drag.file";
import React from "react";

const FormArea: React.FC<{
  setSubmitHandler: (submitHandler: () => void) => void;
}> = ({ setSubmitHandler }) => {
  const { control, errors, handleSubmit, files, setValue, onSubmit, updateFile } =
    useCreateAreaController();

  React.useEffect(() => {
    setSubmitHandler(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, setSubmitHandler]);


console.log(files.background);

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spaceY={5}
      align="flex-start"
      justify="space-between"
      w="100%"
    >
      <Flex alignItems="center" gap="6px">
        <Tabs.Trigger display="flex" value="areas">
          <Icon color="neutral">
            <KeyboardArrowLeftIcon />
          </Icon>
          <Text.Medium fontSize="16px" color="neutral">
            Criar área de membros
          </Text.Medium>
        </Tabs.Trigger>
      </Flex>

      <Flex w="80%" gap={2} justify="space-between" alignItems="center">
        <Input.Base
          control={control}
          label="Nome da área"
          name="title"
          placeholder="Nome da área de membros"
          errorText={errors.title?.message}
          isRequired
          width="100%"
        />
        <ColorPickerRoot
          format="rgba"
          onValueChange={(color) => setValue("color", color.valueAsString)}
          defaultValue={parseColor("#eb5e41")}
          maxW="200px"
        >
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
        placeholder="Domínio personalizado"
        errorText={errors.domain?.message}
        isRequired
        width="80%"
      />

      <Flex gap="2" w="80%" justify="space-between">
        <DragFile
          label="Background da área"
          onFileSelect={(file) => updateFile("background", file)}
          value={files.background}
        />
        <DragFile
          label="Ícone da página"
          onFileSelect={(file) => updateFile("icon", file)}
        />
        <DragFile
          label="Logo da área"
          onFileSelect={(file) => updateFile("logo", file)}
        />
      </Flex>
    </VStack>
  );
};

export default FormArea;
