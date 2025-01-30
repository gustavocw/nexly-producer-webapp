import {
  Box,
  DialogActionTrigger,
  DialogDescription,
  Grid,
  Group,
  Image,
  Tabs,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Btn from "components/button/button";
import Input from "components/input/input";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "components/ui/dialog";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { LuPlus } from "react-icons/lu";
import { Controller } from "react-hook-form";
import { useCreateModuleController } from "./create.module.controller";
import Text from "components/text/text";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "components/ui/radio-card";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "components/ui/file-upload";
import type React from "react";

interface ModalPops {
  isEdit?: boolean;
  module?: Module;
}

export const ModalCreateModule: React.FC<ModalPops> = ({ isEdit, module }) => {
  const {
    control,
    errors,
    onSubmit,
    handleSubmit,
    updateFile,
    creatingModule,
    updatingModule,
    isValid,
    file,
  } = useCreateModuleController({ module, isEdit });


  return (
    <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        {isEdit ? (
          <Icon cursor="pointer">
            <ModeEditOutlineOutlinedIcon />
          </Icon>
        ) : (
          <Btn w="200px" h="40px" label="Novo módulo" iconLeft={<LuPlus />} />
        )}
      </DialogTrigger>
      <DialogContent
        maxW="90%"
        maxH="98%"
        p="32px"
        bg="neutral.60"
        borderRadius="8px"
        gap="28px"
        overflowY="auto"
        overflowX="hidden"
      >
        <DialogHeader>
          <DialogTitle fontSize="24px" color="neutral" fontWeight="400">
            {isEdit ? "Editar módulo" : "Adicionar novo módulo"}
          </DialogTitle>
          <DialogDescription fontSize="14px" color="neutral" fontWeight="400">
            {isEdit
              ? "Edite as informações do módulo"
              : "Insira as informações do novo módulo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs.Root defaultValue="form">
            <HStack
              align="start"
              spaceX="32px"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <DialogBody
                display="flex"
                flexDirection="column"
                gap="20px"
                flex="1"
                minW="300px"
              >
                <Input.Base
                  name="name"
                  label="Nome do módulo"
                  placeholder="Módulo exemplo"
                  control={control}
                  errorText={errors.name?.message}
                />

                <Controller
                  name="stateModule"
                  control={control}
                  render={({ field }) => (
                    <RadioCardRoot w="100%" defaultValue={field.value}>
                      <RadioCardLabel fontSize="14px" color="neutral">
                        Status
                      </RadioCardLabel>
                      <Group w="100%" color="neutral" orientation="vertical">
                        {status.map((item) => (
                          <RadioCardItem
                            {...field}
                            key={item.value}
                            value={item.value}
                            w="100%"
                            label={
                              <VStack align="flex-start" w="100%">
                                <Text.Medium color="neutral" fontSize="16px">
                                  {item.title}
                                </Text.Medium>
                                <Text.Medium color="neutral.10" fontSize="12px">
                                  {item.description}
                                </Text.Medium>
                              </VStack>
                            }
                            p="20px"
                            borderColor="neutral.40"
                            cursor="pointer"
                            _checked={{
                              bg: "neutral.40",
                              borderColor: "neutral.30",
                            }}
                          />
                        ))}
                      </Group>
                    </RadioCardRoot>
                  )}
                />
                <FileUploadRoot
                  gap={0}
                  alignItems="stretch"
                  maxFiles={1}
                  onFileAccept={(file) => {
                    if (file.files.length > 0) {
                      updateFile(file.files[0]);
                    }
                  }}
                >
                  <Text.Medium my="4px" fontSize="14px">
                    Capa do módulo
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
                        <Image
                          maxW="200px"
                          src={
                            file instanceof File
                              ? URL.createObjectURL(file)
                              : file || "/images/FileImage.svg"
                          }
                        />
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
                    A imagem de capa deve estar no formato JPG ou PNG e tamanho
                    máximo de 5 MB. Dimensões ideais: 1.500 x 1.000 pixels.
                  </Text.Medium>
                </FileUploadRoot>
              </DialogBody>

              <DialogBody flex="1" minW="300px">
                <HStack w="100%">
                  <Input.Text
                    label="Descrição"
                    height="220px"
                    maxLength={200}
                    control={control}
                    name="description"
                  />
                </HStack>
                <VStack w="100%">
                  <Controller
                    name="format"
                    control={control}
                    render={({ field }) => (
                      <RadioCardRoot
                        w="100%"
                        orientation="vertical"
                        align="center"
                        defaultValue={field.value}
                      >
                        <RadioCardLabel fontSize="14px" color="neutral">
                          Escolha o formato do seu módulo
                        </RadioCardLabel>
                        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={4}>
                          {items.map((item) => (
                            <VStack w="100%">
                              <RadioCardItem
                                w="100%"
                                {...field}
                                key={item.value}
                                value={item.value}
                                label={
                                  <VStack alignItems="center" w="100%">
                                    <Box>{item.format}</Box>
                                  </VStack>
                                }
                                p="20px"
                                borderColor="neutral.40"
                                cursor="pointer"
                                borderRadius="12px"
                                _checked={{
                                  bg: "neutral.60",
                                  borderColor: "primary.50",
                                }}
                              />
                              <Text.Medium
                                textAlign="center"
                                fontSize="16px"
                                color="neutral"
                              >
                                {item.title}
                              </Text.Medium>
                            </VStack>
                          ))}
                        </Grid>
                      </RadioCardRoot>
                    )}
                  />
                </VStack>
              </DialogBody>
            </HStack>

            <DialogFooter w="100%">
              <DialogActionTrigger asChild>
                <Btn w="15%" label="Cancelar" bg="transparent" />
              </DialogActionTrigger>
              <DialogActionTrigger asChild>
                <Btn
                  w="15%"
                  label={module ? "Editar Módulo" : "Criar Módulo"}
                  onClick={handleSubmit(onSubmit)}
                  isLoading={creatingModule || updatingModule}
                  disabled={!isValid}
                />
              </DialogActionTrigger>
            </DialogFooter>
          </Tabs.Root>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

const status = [
  {
    value: "PRIVADO",
    title: "Privado",
    description:
      "Somente você pode ver esse vídeo, ele não aparecerá no seu curso ou resultados de pesquisas.",
  },
  {
    value: "PUBLICO",
    title: "Público",
    description: "Todos podem ver esse vídeo.",
  },
];

const items = [
  {
    value: "VERTICAL_RECT",
    title: "Retângulo Vertical",
    format: (
      <Box
        w="40px"
        h="80px"
        border="1px dashed"
        borderColor="primary.40"
        borderRadius="4px"
      />
    ),
  },
  {
    value: "HORIZONTAL_RECT",
    title: "Retângulo Horizontal",
    format: (
      <Box
        w="130px"
        h="50px"
        mt="15px"
        border="1px dashed"
        borderColor="primary.40"
        borderRadius="4px"
      />
    ),
  },
  {
    value: "SQUARE",
    title: "Quadrado",
    format: (
      <Box
        w="100px"
        h="100px"
        border="1px dashed"
        borderColor="primary.40"
        borderRadius="4px"
      />
    ),
  },
  {
    value: "VERTICAL_RECT_MAX",
    title: "Retângulo Vertical Grande",
    format: (
      <Box
        w="50px"
        h="100px"
        border="1px dashed"
        borderColor="primary.40"
        borderRadius="4px"
      />
    ),
  },
];
