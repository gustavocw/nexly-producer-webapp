import { useState, useEffect } from "react";
import { HStack, Box, VStack, Flex } from "@chakra-ui/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { VscError } from "react-icons/vsc";

import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardRoot,
} from "components/ui/clipboard";
import { InputGroup } from "components/ui/input-group";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "components/ui/dialog";
import Text from "components/text/text";
import { checkDomainStatus, verifyDNSRecords } from "utils/domainVercel";
import { useQuery } from "@tanstack/react-query";

const ModalDomain: React.FC<{ area: Area }> = ({ area }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isPropagationPending, setIsPropagationPending] = useState(false);

  const { data: domainStatus, isLoading: isDomainLoading } = useQuery({
    queryKey: ["domainStatus", area.domain],
    queryFn: () => checkDomainStatus(area.domain),
    enabled: !!area.domain,
  });

  const { data: dnsRecords, isLoading: isDNSLoading } = useQuery({
    queryKey: ["dnsRecords", area.domain],
    queryFn: () => verifyDNSRecords(area.domain),
    enabled: !!area.domain,
  });

  useEffect(() => {
    if (domainStatus?.data?.verified === true) {
      setIsConfigured(true);
      setIsPropagationPending(false);
    } else if (
      dnsRecords?.error &&
      dnsRecords?.message === "Aguardando propagação dos registros DNS."
    ) {
      setIsPropagationPending(true);
      setIsConfigured(false);
    } else if (
      !dnsRecords?.error &&
      (dnsRecords?.missingRecords?.length ?? 0) === 0
    ) {
      setIsConfigured(true);
      setIsPropagationPending(false);
    } else {
      setIsConfigured(false);
      setIsPropagationPending(false);
    }
  }, [domainStatus, dnsRecords]);

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot size="lg" placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Flex alignItems="center" cursor="pointer">
            {isConfigured ? (
              <IoIosCheckmarkCircle color="#00C851" size={22} />
            ) : isPropagationPending ? (
              <VscError color="orange" size={22} />
            ) : (
              <VscError color="red" size={22} />
            )}
            <Text.Medium fontSize="18px" color="neutral" ml="8px">
              Configuração de Domínio
            </Text.Medium>
          </Flex>
        </DialogTrigger>
        <DialogContent bg="neutral.60" p="6" borderRadius="8px">
          <DialogHeader>
            <DialogTitle fontSize="20px" color="neutral">
              Configuração do Domínio
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack align="start" spaceY={4}>
              <Text.Medium fontSize="18px" color="neutral">
                Status do Domínio:
              </Text.Medium>
              <Text.Medium
                fontSize="18px"
                color={
                  isConfigured
                    ? "green.400"
                    : isPropagationPending
                    ? "orange.400"
                    : "red.400"
                }
              >
                {isDomainLoading || isDNSLoading
                  ? "🔄 Verificando..."
                  : isConfigured
                  ? "✅ Domínio configurado corretamente!"
                  : isPropagationPending
                  ? "⏳ Aguardando propagação dos registros DNS..."
                  : domainStatus?.message ||
                    dnsRecords?.message ||
                    "❌ Erro ao configurar o domínio."}
              </Text.Medium>

              {isPropagationPending && (
                <Box p="8px" bg="neutral.60" borderRadius="5px" w="100%">
                  <Text.Medium fontSize="18px" color="orange.400">
                    ⏳ Propagação em andamento...
                  </Text.Medium>
                  <Text.Small fontSize="16px" color="neutral">
                    A propagação dos registros DNS pode levar de **5 minutos a
                    24 horas**, dependendo do seu provedor de domínio. Se os
                    registros foram adicionados corretamente, aguarde esse tempo
                    para que seu domínio seja reconhecido pela Vercel.
                  </Text.Small>
                  <Text.Small fontSize="16px" color="neutral" mt="4">
                    Você pode verificar manualmente o status da propagação
                    usando:
                  </Text.Small>
                  <Text.Small fontSize="16px" color="neutral">
                    🔍{" "}
                    <a href="https://www.whatsmydns.net/" target="_blank">
                      WhatsMyDNS
                    </a>{" "}
                    (para checar a propagação global)
                  </Text.Small>
                  <Text.Small fontSize="16px" color="neutral">
                    🛠️{" "}
                    <a
                      href="https://toolbox.googleapps.com/apps/dig/"
                      target="_blank"
                    >
                      Google Admin Toolbox Dig
                    </a>
                  </Text.Small>
                </Box>
              )}

              {(dnsRecords?.missingRecords?.length ?? 0) > 0 &&
                !isConfigured &&
                !isPropagationPending && (
                  <Box p="8px" bg="neutral.60" borderRadius="5px" w="100%">
                    <Text.Medium fontSize="18px" color="red.400">
                      🚨 Registros DNS ausentes:
                    </Text.Medium>
                    {dnsRecords?.missingRecords?.map((record, index) => (
                      <Text.Medium key={index} fontSize="16px" color="neutral">
                        🔹 <strong>Tipo:</strong> {record.type} |{" "}
                        <strong>Nome:</strong> {record.name} |{" "}
                        <strong>Valor:</strong> {record.value}
                      </Text.Medium>
                    ))}
                  </Box>
                )}

              {area.domain && !isConfigured && (
                <VStack
                  align="flex-start"
                  spaceY={3}
                  p="8px"
                  bg="neutral.60"
                  borderRadius="5px"
                  w="100%"
                >
                  <Text.Medium fontSize="18px" color="neutral">
                    Para configurar o domínio <strong>{area.domain}</strong>,
                    aponte os DNS para:
                  </Text.Medium>

                  <Flex
                    justify="space-between"
                    borderWidth="1px"
                    borderColor="neutral.40"
                    w="100%"
                    p={2}
                    borderRadius={4}
                  >
                    <Text.Medium fontWeight="700" fontSize="18px" color="neutral">
                      TIPO
                    </Text.Medium>
                    <Text.Medium fontWeight="700" fontSize="18px" color="neutral">
                      NOME
                    </Text.Medium>
                    <Text.Medium fontWeight="700" fontSize="18px" color="neutral">
                      VALOR
                    </Text.Medium>
                  </Flex>

                  <Flex
                    justify="space-between"
                    borderWidth="1px"
                    borderColor="neutral.40"
                    w="100%"
                    p={2}
                    borderRadius={4}
                  >
                    <Text.Medium fontSize="18px" color="neutral">
                      CNAME
                    </Text.Medium>
                    <Text.Medium fontSize="18px" color="neutral">
                      wwww
                    </Text.Medium>
                    <Text.Medium fontSize="18px" color="neutral">
                      76.76.21.21
                    </Text.Medium>
                  </Flex>

                  <Flex
                    justify="space-between"
                    borderWidth="1px"
                    borderColor="neutral.40"
                    w="100%"
                    p={2}
                    borderRadius={4}
                  >
                    <Text.Medium fontSize="18px" color="neutral">
                      A
                    </Text.Medium>
                    <Text.Medium fontSize="18px" color="neutral">
                      @
                    </Text.Medium>
                    <Text.Medium fontSize="18px" color="neutral">
                      76.76.21.21
                    </Text.Medium>
                  </Flex>

                  <Flex
                    justify="space-between"
                    alignItems="center"
                    borderWidth="1px"
                    borderColor="neutral.40"
                    w="100%"
                    p={2}
                    borderRadius={4}
                  >
                    <Text.Medium fontSize="18px" color="neutral">
                      TXT
                    </Text.Medium>
                    <Text.Medium fontSize="18px" color="neutral">
                      _vercel
                    </Text.Medium>
                    <ClipboardRoot
                      width="200px"
                      value={`vc-domain-verify=${area.domain},110ca7838b20b76d549e`}
                    >
                      <InputGroup
                        color="neutral"
                        width="full"
                        endElement={<ClipboardIconButton mx="2" />}
                      >
                        <ClipboardInput px={2} />
                      </InputGroup>
                    </ClipboardRoot>
                  </Flex>
                </VStack>
              )}
            </VStack>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default ModalDomain;
