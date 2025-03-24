import { Box, Flex, HStack, VStack, parseColor } from "@chakra-ui/react";
import Input from "components/input/input";
import { useCreateAreaController } from "./form.controller";
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
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import Btn from "components/button/button";
import ModalGpt from "components/GptModal";
import help from "./help";
import ConfirmDialog from "components/confirmDialog";
import { Switch } from "components/ui/switch";

const FormArea: React.FC<{
  selectedArea: Area | null;
  goBack: () => void;
}> = ({ selectedArea, goBack }) => {
  const {
    control,
    handleSubmit,
    handleComplete,
    backgroundFile,
    iconFile,
    logoFile,
    creatingArea,
    updatingArea,
    mutateDelete,
    onSubmit,
    updateFile,
    watch,
  } = useCreateAreaController(selectedArea, goBack);

  const background = watch("background");

  const color = watch("color") || "#ffffff";
  const [isDialogOpen, setDialogOpen] = useState(false);

  const isYouTubeOrVimeo =
    background?.includes("youtube.com") || background?.includes("vimeo.com");
  const isOptimumCDN = background?.startsWith(
    "https://opt-nexly-members-courses.s3.us-east-1.amazonaws.com"
  );

  const [useUrl, setUseUrl] = useState(!isOptimumCDN);

  useEffect(() => {
    if (isYouTubeOrVimeo) setUseUrl(true);
    else if (isOptimumCDN) setUseUrl(false);
  }, [background]);

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spaceY={8}
      align="flex-start"
      justify="space-between"
      w="100%"
    >
      <Flex
        my={5}
        w="80%"
        gap={2}
        justify="space-between"
        alignItems="flex-end"
      >
        <ModalGpt
          titleModal="Conte pra nós sobre o que será sua área de membro."
          help={help}
          onConfirm={handleComplete}
        />
      </Flex>

      <Flex w="90%" gap={2} justify="space-between" alignItems="flex-end">
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
        width="90%"
      />
      <Input.Text
        control={control}
        label="Descrição da área"
        name="description"
        placeholder="Descrição da área de membros"
        width="90%"
      />
      <Flex 
        flexWrap="wrap" 
        gap={4} 
        alignItems={useUrl ? "flex-start" : "flex-end"} 
        w="90%"
      >
        <VStack alignItems="flex-start" minW="300px" flex={1}>
          <Switch
            checked={useUrl}
            onCheckedChange={(checked) => {
              if (checked.checked === true) {
                setUseUrl(true);
              } else {
                setUseUrl(false);
              }
            }}
            color="neutral"
          >
            Tipo de background: {useUrl ? "URL" : "Arquivo"}
          </Switch>
          {useUrl ? (
            <Box w="100%" my={5}>
              <Input.Base
                control={control}
                label="URL Background"
                name="background"
                placeholder="URL da imagem ou vídeo (YouTube/Vimeo)"
                width="100%"
              />
            </Box>
          ) : (
            <DragFile
              width="100%"
              label="Background da área"
              onFileSelect={(file) => updateFile("background", file)}
              value={backgroundFile || background}
            />
          )}
        </VStack>
        <DragFile
          width={["100%", "100%", "30%"]}
          label="Ícone da página"
          onFileSelect={(file) => updateFile("icon", file)}
          value={iconFile}
          hint="Ícone que aparecerá na aba do navegador (favicon). Use uma imagem quadrada de no mínimo 32x32 pixels."
        />
        <DragFile
          width={["100%", "100%", "30%"]}
          label="Logo da área"
          value={logoFile}
          onFileSelect={(file) => updateFile("logo", file)}
          hint="Logo que aparecerá no topo da página. Recomendado usar formato PNG com fundo transparente."
        />
      </Flex>

      <Flex
        w="90%"
        py={10}
        justify={selectedArea ? "space-between" : "flex-end"}
      >
        {selectedArea && (
          <Btn
            w="200px"
            label="Deletar Área"
            bg="error.50"
            bgHover="red"
            onClick={() => setDialogOpen(true)}
            isLoading={mutateDelete.isPending}
          />
        )}
        <Btn
          w="200px"
          label="Salvar"
          onClick={() => handleSubmit(onSubmit)()}
          isLoading={creatingArea || updatingArea}
        />
      </Flex>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        message="Tem certeza que deseja excluir esta área de membro ?"
        onConfirm={() => mutateDelete.mutate(selectedArea?._id)}
      />
    </VStack>
  );
};

export default FormArea;
