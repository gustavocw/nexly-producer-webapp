import { Flex, HStack, VStack } from "@chakra-ui/react";
import CertificateIcon from "assets/icons/CertificateIcon";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import { useCertificateController } from "./certificates.controller";
import Input from "components/input/input";
import CertificateImage from "./certificate/certificate.image";
import Btn from "components/button/button";
import { DragFile } from "components/fileInput/drag.file";
import { Controller } from "react-hook-form";
import { Switch } from "components/ui/switch";
import Select from "components/select/select";

const Certificates = () => {
  const {
    control,
    watch,
    errors,
    updateFiles,
    setValue,
    handleSubmit,
    onSubmit,
    files,
    certificate,
  } = useCertificateController();

  const percents = [
    { value: "70", label: "70%" },
    { value: "80", label: "80%" },
    { value: "90", label: "90%" },
    { value: "100", label: "100%" },
  ];

  const signatureUrl = watch("signatureUrl") || certificate?.signatureUrl;
  const description = watch("description") || certificate?.description;
  const logoUrl = files.logoUrl || certificate?.logoUrl;
  const backgroundUrl = files.file || certificate?.backgroundUrl;

  return (
    <VStack flexDir="column" w="100%" align="flex-start" gap="32px">
      <Text.Medium fontSize="16px">Informações do certificado</Text.Medium>
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
              logo={logoUrl}
              fundo={backgroundUrl}
              descricao={description}
              assinatura={signatureUrl}
              nome="NOME DO ALUNO FICA AQUI"
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
          <VStack spaceY="32px" p="20px" w="100%" align="flex-start">
            <Input.Base
              name="signatureUrl"
              label="Assinatura"
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
            <Flex alignItems="flex-end" w="100%" gap={2}>
              <Select
                options={percents}
                name="percent"
                label="Selecione a porcentagem"
                control={control}
                placeholder="%"
              />
              <Controller
                name="progress"
                control={control}
                render={({ field }) => (
                  <>
                    <Flex color="neutral" mb={3} w="30%">
                      <Switch
                        checked={field.value === "true"}
                        onCheckedChange={(checked) =>
                          setValue("progress", checked ? "true" : "false")
                        }
                      >
                        Mostrar progresso?
                      </Switch>
                    </Flex>
                  </>
                )}
              />
            </Flex>
            <HStack alignItems="center" w="100%">
              <DragFile
                label="Logotipo"
                onFileSelect={(file) => updateFiles("logoUrl", file)}
              />
              <DragFile
                label="Capa"
                onFileSelect={(file) => updateFiles("file", file)}
              />
            </HStack>
          </VStack>
          <HStack px={4} py={10} w="100%" justify="flex-end">
            <Btn
              onClick={handleSubmit(onSubmit)}
              type="submit"
              w="200px"
              label="Salvar"
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Certificates;
