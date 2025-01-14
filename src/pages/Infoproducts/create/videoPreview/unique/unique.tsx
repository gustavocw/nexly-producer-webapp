import { HStack, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import Btn from "components/button/button";
import Select from "components/select/select";
import { DragFile } from "components/fileInput/drag.file";
import useUniqueVideoController from "./unique.controller";

const UniqueVideo = () => {
  const { control, errors, onSubmit, handleSubmit, updateFile, lesson } =
    useUniqueVideoController();

  return (
    <VStack
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      p="20px"
      gap="20px"
      w="100%"
    >
      <HStack align="flex-start" w="100%">
        <VStack pt={1} alignItems="flex-start" w="100%">
          <HStack alignItems="flex-start" w="100%">
            <Input.Base
              label="Título"
              control={control}
              name="name"
              placeholder="Título da aula"
              errorText={errors.name?.message}
              isRequired
            />
            <Input.Base
              label="URL"
              control={control}
              name="urlMovie"
              placeholder="URL da aula"
              errorText={errors.urlMovie?.message}
              isRequired
            />
          </HStack>
          <HStack alignItems="flex-start" w="100%">
            <Select
              name="stateLesson"
              control={control}
              label="Privacidade"
              options={[
                { value: "PRIVADO", label: "Privado" },
                { value: "PUBLICO", label: "Público" },
              ]}
              placeholder="Insira o estado"
            />
            {!lesson ? (
              <Select
                name="provider"
                control={control}
                label="Plataforma"
                options={[{ value: "youtube", label: "Youtube" }]}
                placeholder="Insira a plataforma."
              />
            ) : (
              <Select
              name="stateLesson"
              control={control}
              options={[
                { label: "Público", value: "PUBLICO" },
                { label: "Privado", value: "PRIVADO" },
              ]}
              label="Status"
              placeholder="Escolha o status "
            />
            )}
          </HStack>
        </VStack>
      </HStack>
      <HStack alignItems="flex-start" w="100%">
        <Input.Text
          label="Descrição"
          control={control}
          name="description"
          minH="300px"
          placeholder="Descrição da aula"
          errorText={errors.description?.message}
          isRequired
        />
        <DragFile
          width="100%"
          label="Thumbnail"
          onFileSelect={(file) => updateFile(file)}
        />
      </HStack>
      <HStack w="100%" justify="flex-end">
        <Btn label="Publicar" onClick={handleSubmit(onSubmit)} w="200px" />
      </HStack>
    </VStack>
  );
};

export default UniqueVideo;
