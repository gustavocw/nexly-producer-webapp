import {
  Box,
  DialogActionTrigger,
  DialogDescription,
  Grid,
  Group,
  Image,
  Tabs,
  VStack,
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

export const ModalCreateModule = () => {
  const { control, errors, onSubmit, handleSubmit } =
    useCreateModuleController();

  return (
    <DialogRoot placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Btn w="200px" h="40px" label="Novo módulo" iconLeft={<LuPlus />} />
      </DialogTrigger>
      <DialogContent p="32px" bg="neutral.60" borderRadius="8px" gap="32px">
        <DialogHeader>
          <DialogTitle fontSize="24px" color="neutral" fontWeight="400">
            Adicionar novo módulo
          </DialogTitle>
          <DialogDescription fontSize="14px" color="neutral" fontWeight="400">
            Insira as informações do novo módulo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs.Root defaultValue="image">
            <Tabs.Content value="image">
              <DialogBody display="flex" flexDirection="column" gap="20px">
                {/* Nome do módulo */}
                <Input.Base
                  name="name"
                  label="Nome do módulo"
                  placeholder="Módulo exemplo"
                  control={control}
                  errorText={errors.name?.message}
                />

                {/* Status (Privado ou Público) */}
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <RadioCardRoot w="100%" defaultValue={field.value}>
                      <RadioCardLabel fontSize="14px" color="neutral">
                        Status
                      </RadioCardLabel>
                      <Group
                        w="100%"
                        color="neutral"
                        attached
                        orientation="vertical"
                      >
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
                              bg: "neutral.60",
                            }}
                          />
                        ))}
                      </Group>
                    </RadioCardRoot>
                  )}
                />

                <Controller
                  name="capa"
                  control={control}
                  render={({ field }) => (
                    <FileUploadRoot
                      gap={0}
                      maxW="100%"
                      alignItems="stretch"
                      maxFiles={1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      <Text.Medium my="4px" fontSize="14px">
                        Capa do módulo
                      </Text.Medium>
                      <FileUploadDropzone
                        cursor="pointer"
                        bg="#1C06284D"
                        height="100px"
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
                              <a
                                style={{ color: "#5E84F1", cursor: "pointer" }}
                              >
                                selecione manualmente
                              </a>
                            </Text.Medium>
                            <FileUploadList w="100px" />
                          </VStack>
                        }
                      />
                      <Text.Medium my="4px" fontSize="12px">
                        A imagem de capa deve estar no formato JPG ou PNG e
                        tamanho máximo de 5 MB. Dimensões ideais: 1.500 x 1.000
                        pixels.
                      </Text.Medium>
                    </FileUploadRoot>
                  )}
                />
              </DialogBody>
              <DialogFooter w="100%">
                <DialogActionTrigger asChild>
                  <Btn w="50%" label="Cancel" bg="transparent" />
                </DialogActionTrigger>
                <Tabs.Trigger w="100%" value="format">
                  <Btn w="100%" label="Continuar" />
                </Tabs.Trigger>
              </DialogFooter>
            </Tabs.Content>
            <Tabs.Content value="format">
              <DialogBody>
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
              <DialogFooter w="100%" py={10}>
              <DialogActionTrigger asChild>
                  <Btn
                    w="50%"
                    label="Cancelar"
                    bg="transparent"
                  />
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Btn
                    w="50%"
                    label="Criar Módulo"
                    onClick={handleSubmit(onSubmit)}
                  />
                </DialogActionTrigger>
              </DialogFooter>
            </Tabs.Content>
          </Tabs.Root>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

const status = [
  {
    value: "Privado",
    title: "Privado",
    description:
      "Somente você pode ver esse vídeo, ele não aparecerá no seu curso ou resultados de pesquisas.",
  },
  {
    value: "Publico",
    title: "Público",
    description: "Todos podem ver esse vídeo.",
  },
];

const items = [
  {
    value: "vertical-rectangle",
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
    value: "horizontal-rectangle",
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
    value: "square",
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
    value: "large-vertical-rectangle",
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
