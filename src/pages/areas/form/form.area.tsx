import { Flex, HStack, VStack, parseColor } from "@chakra-ui/react";
import Input from "components/input/input";
import { useCreateAreaController } from "./form.controller";
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
import React, { useState } from "react";
import SelectOption from "components/selectOption/select";
import { Controller } from "react-hook-form";

const FormArea: React.FC<{
  setSubmitHandler: (submitHandler: () => void) => void;
  selectedArea: Area | null;
}> = ({ setSubmitHandler, selectedArea }) => {
  const {
    control,
    handleSubmit,
    backgroundFile,
    iconFile,
    logoFile,
    setBackgroundFile,
    setIconFile,
    setLogoFile,
    setValue,
    onSubmit,
    updateFile,
    watch,
  } = useCreateAreaController(selectedArea);

  const [useUrl, setUseUrl] = useState(true);
  const color = watch("color") || "#ffffff";
  React.useEffect(() => {
    setSubmitHandler(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, setSubmitHandler]);

  React.useEffect(() => {
    if (selectedArea) {
      setValue("title", selectedArea.title);
      setValue("domain", selectedArea.domain);
      setValue("color", selectedArea.color);
      setBackgroundFile(
        selectedArea.background ? new File([], selectedArea.background) : null
      );
      setIconFile(selectedArea.icon ? new File([], selectedArea.icon) : null);
      setLogoFile(selectedArea.logo ? new File([], selectedArea.logo) : null);
    }
  }, [selectedArea, setValue, setBackgroundFile, setIconFile, setLogoFile]);

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spaceY={8}
      align="flex-start"
      justify="space-between"
      w="100%"
    >
      <Flex w="80%" gap={2} justify="space-between" alignItems="flex-end">
        <Input.Base
          control={control}
          label="Nome da área"
          name="title"
          placeholder="Nome da área de membros"
          isRequired
          width="100%"
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPickerRoot
              format="rgba"
              onValueChange={(color) => field.onChange(color?.valueAsString)}
              defaultValue={parseColor("#FF0000")}
              value={parseColor(color)}
              maxW="200px"
            >
              <ColorPickerLabel color="neutral">Cor primária</ColorPickerLabel>
              <ColorPickerControl>
                <ColorPickerInput
                  borderColor="neutral.30"
                  color="neutral"
                  p={2}
                />
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
          )}
        />
      </Flex>

      <Input.Base
        control={control}
        label="Domínio"
        name="domain"
        placeholder="Domínio personalizado"
        isRequired
        width="80%"
      />

      <Input.Text
        control={control}
        label="Descrição da área"
        name="description"
        placeholder="Descrição da área de membros"
        width="80%"
      />
      <HStack w="80%" justify="space-between" alignItems="center">
        <Text.Medium fontSize="14px" color="neutral">
          Escolha o tipo de background:
        </Text.Medium>
        <SelectOption
          placeholder="Selecione o tipo de background"
          onSelectChange={(value) => setUseUrl(value === "url")}
          options={[
            { label: "URL", value: "url" },
            { label: "Imagem", value: "image" },
          ]}
        />
      </HStack>

      {useUrl ? (
        <Input.Base
          control={control}
          label="URL Background"
          name="background"
          placeholder="URL da imagem ou vídeo (YouTube/Vimeo)"
          width="80%"
        />
      ) : (
        <DragFile
          label="Background da área"
          onFileSelect={(file) => updateFile("background", file)}
          value={backgroundFile?.name}
        />
      )}

      <Flex gap="2" w="80%" justify="space-between">
        <DragFile
          label="Ícone da página"
          onFileSelect={(file) => updateFile("icon", file)}
          value={iconFile?.name}
        />
        <DragFile
          label="Logo da área"
          value={logoFile?.name}
          onFileSelect={(file) => updateFile("logo", file)}
        />
      </Flex>
    </VStack>
  );
};

export default FormArea;
