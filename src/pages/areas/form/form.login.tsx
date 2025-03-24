import { Box, Flex, HStack, VStack, parseColor } from "@chakra-ui/react";
import Input from "components/input/input";
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
import { Controller } from "react-hook-form";
import Btn from "components/button/button";
import { Switch } from "components/ui/switch";
import { useLoginCustomizationController } from "./formLogin.controller";

const FormLogin: React.FC<{
  selectedArea: any | null;
}> = ({ selectedArea }) => {
  const {
    control,
    handleSubmit,
    backgroundImageFile,
    iconFile,
    logoFile,
    creatingLogin,
    onSubmit,
    updateFile,
  } = useLoginCustomizationController(selectedArea);

  const [useUrl, setUseUrl] = useState(true);

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spaceY={8}
      align="flex-start"
      w="100%"
    >
      <Flex w="90%" gap={2} justify="space-between" alignItems="flex-end">
        <Input.Base
          control={control}
          label="Título da página"
          name="title"
          placeholder="Título que aparecerá na página de login"
          isRequired
          width="100%"
        />
        <Controller
          name="primary_color"
          control={control}
          render={({ field }) => (
            <ColorPickerRoot
              format="rgba"
              onValueChange={(color) => field.onChange(color?.valueAsString)}
              defaultValue={parseColor("#FF0000")}
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

      <Controller
        name="backgroundColor"
        control={control}
        render={({ field }) => (
          <ColorPickerRoot
            format="rgba"
            onValueChange={(color) => field.onChange(color?.valueAsString)}
            defaultValue={parseColor("#FFFFFF")}
          >
            <ColorPickerLabel color="neutral">Cor de fundo</ColorPickerLabel>
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

      <Flex
        alignItems={useUrl ? "flex-start" : "flex-end"}
        flexWrap="wrap"
        gap={4}
        w="90%"
      >
        <VStack alignItems="flex-start" minW="300px" flex={1}>
          <Switch
            checked={useUrl}
            onCheckedChange={(checked) => setUseUrl(checked.checked)}
            color="neutral"
          >
            Tipo de imagem de fundo: {useUrl ? "URL" : "Arquivo"}
          </Switch>
          {useUrl ? (
            <Box w="100%" my={5}>
              <Input.Base
                control={control}
                label="URL da imagem de fundo"
                name="backgroundImage"
                placeholder="URL da imagem de fundo"
                width="100%"
              />
            </Box>
          ) : (
            <DragFile
              width="100%"
              label="Imagem de fundo"
              onFileSelect={(file) => updateFile("backgroundImage", file)}
              value={backgroundImageFile}
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
          label="Logo"
          value={logoFile}
          onFileSelect={(file) => updateFile("logo", file)}
          hint="Logo que aparecerá no topo da página. Recomendado usar formato PNG com fundo transparente."
        />
      </Flex>

      <Flex w="90%" py={10} justify="flex-end">
        <Btn
          w="200px"
          label="Salvar"
          onClick={() => handleSubmit(onSubmit)()}
          isLoading={creatingLogin}
        />
      </Flex>
    </VStack>
  );
};

export default FormLogin;
