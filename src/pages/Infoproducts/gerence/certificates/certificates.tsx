import { Flex, HStack, VStack } from "@chakra-ui/react";
import CertificateIcon from "assets/icons/CertificateIcon";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import { useCertificateController } from "./certificates.controller";
import Input from "components/input/input";
import CertificateImage from "./certificate/certificate.image";
import Btn from "components/button/button";
import { DragFile } from "components/fileInput/drag.file";

const Certificates = () => {
  const { control, watch, errors, updateFiles, handleSubmit, onSubmit } =
    useCertificateController();

  const signatureUrl = watch("signatureUrl");
  const description = watch("description");
  // const percent = watch("percent");
  // const progress = watch("progress");

  return (
    <VStack flexDir="column" w="100%" align="flex-start" gap="32px">
      <Text.Medium fontSize="16px">Informações do certificado</Text.Medium>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <VStack
          boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          bg="neutral.60"
          borderRadius="8px"
          p="20px"
          gap="16px"
          maxW="260px"
          w="100%"
          h="100px"
          mb="32px"
        >
          <Flex gap="16px" alignItems="center">
            <CertificateIcon width={32} height={32} />
            <VStack align="flex-start">
              <Text.Medium fontSize="16px">Certificados emitidos:</Text.Medium>
              <Text.Medium fontSize="16px">68</Text.Medium>
            </VStack>
          </Flex>
        </VStack>
        <VStack w="100%" gap="32px">
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
                logo={signatureUrl}
                fundo="imagem-capa.png"
                descricao={description}
                assinatura="Nexly Members"
                nome="Aluno Teste"
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
                name="signatureUrl"
                label="URL da Assinatura"
                placeholder="Ex: https://example.com/assinatura.png"
                control={control}
                errorText={errors.signatureUrl?.message}
              />
              <Input.Text
                maxLength={200}
                name="description"
                label="Descrição"
                placeholder="Ex: Certificado por concluir o curso com excelência."
                control={control}
                errorText={errors.description?.message}
              />
              <Input.Base
                name="percent"
                label="Porcentagem"
                placeholder="Ex: 100"
                control={control}
                type="number"
                errorText={errors.percent?.message}
              />
              <Input.Base
                name="progress"
                label="Progresso"
                placeholder="Ex: true"
                control={control}
                type="checkbox"
                errorText={errors.progress?.message}
              />
              <HStack alignItems="center" w="100%">
                <DragFile
                  label="Logo"
                  onFileSelect={(file) => updateFiles("logo", file)}
                />
                <DragFile
                  label="Capa"
                  onFileSelect={(file) => updateFiles("background", file)}
                />
              </HStack>
            </VStack>
            <HStack px={4} py={10} w="100%" justify="flex-end">
              <Btn
                type="submit"
                w="200px"
                label="Salvar"
                onClick={handleSubmit(onSubmit)}
              />
            </HStack>
          </VStack>
        </VStack>
      </form>
    </VStack>
  );
};

export default Certificates;
