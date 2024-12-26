import { Flex, HStack, Image, VStack } from "@chakra-ui/react";
import CertificateIcon from "assets/icons/CertificateIcon";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import { useCertificateController } from "./certificates.controller";
import Input from "components/input/input";
import { Controller } from "react-hook-form";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "components/ui/file-upload";
import CertificateImage from "./certificate/certificate.image";
import Btn from "components/button/button";

const Certificates = () => {
  const { control, watch, handleSubmit, onSubmit } = useCertificateController();

  const name = watch("name");
  const description = watch("description");
  const logo = watch("logo");
  const capa = watch("capa");

  return (
    <VStack align="flex-start" gap="32px">
      <Text.Medium fontSize="16px">Informações do certificado</Text.Medium>
      <VStack
        boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
        bg="neutral.60"
        borderRadius="8px"
        p="20px"
        gap="16px"
        w="260px"
        h="100px"
      >
        <Flex gap="16px" alignItems="center">
          <CertificateIcon width={32} height={32} />
          <VStack align="flex-start">
            <Text.Medium fontSize="16px">Certificados emitidos:</Text.Medium>
            <Text.Medium fontSize="16px">68</Text.Medium>
          </VStack>
        </Flex>
      </VStack>
      <VStack
        align="flex-start"
        w="100%"
        gap="16px"
        boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      >
        <VStack align="flex-start" gap="16px" p="20px">
          <Text.Medium fontSize="16px">Pré-visualização</Text.Medium>
          <Text.Medium fontSize="12px" color="neutral.10">
            Informações do certificado
          </Text.Medium>
        </VStack>
        <Divider width="100%" />
        <HStack justify="center" w="100%">
          <CertificateImage
            logo={logo}
            fundo={capa}
            descricao={description}
            assinatura="Nexly Members"
            nome={name}
            curso="Introdução à programação em Python"
          />
        </HStack>
      </VStack>
      <VStack
        align="flex-start"
        w="100%"
        gap="16px"
        boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      >
        <VStack align="flex-start" gap="16px" p="20px">
          <Text.Medium fontSize="16px">Dados do certificado</Text.Medium>
          <Text.Medium fontSize="12px" color="neutral.10">
            Cadastre os dados de exibição do certificado
          </Text.Medium>
        </VStack>
        <Divider width="100%" />
        <VStack p="20px" w="100%" align="flex-start">
          <Input.Base
            name="name"
            label="Nome do aluno"
            placeholder="Ex: João Silva"
            control={control}
          />
          <Input.Text
            maxLength={200}
            name="description"
            label="Descrição curta de conclusão"
            placeholder="Ex: Certificado por concluir o curso com excelência."
            control={control}
          />
          <HStack w="100%">
            <Controller
              name="logo"
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
                    Logotipo
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
                  <Text.Medium my="4px" fontSize="12px">
                    A imagem de logo deve estar no formato JPG ou PNG e tamanho
                    máximo de 5 MB. Dimensões ideais: 1.500 x 1.000 pixels.
                  </Text.Medium>
                </FileUploadRoot>
              )}
            />
            <Controller
              name="capa"
              control={control}
              render={({ field }) => (
                <FileUploadRoot
                  gap={0}
                  alignItems="stretch"
                  maxFiles={1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.value);
                  }}
                >
                  <Text.Medium my="4px" fontSize="14px">
                    Fundo do certificado
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
                  <Text.Medium my="4px" fontSize="12px">
                    A imagem de fundo deve estar no formato JPG ou PNG e tamanho
                    máximo de 5 MB. Dimensões ideais: 1.500 x 1.000 pixels.
                  </Text.Medium>
                </FileUploadRoot>
              )}
            />
          </HStack>
        </VStack>
        <HStack w="100%" justify="flex-end">
        <Btn w="30%" label="Salvar" onClick={() => handleSubmit(onSubmit)} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Certificates;
