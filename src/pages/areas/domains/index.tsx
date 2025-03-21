import { useRef, useState } from "react";
import { VStack, Flex, Box, Spinner, Input } from "@chakra-ui/react";
import Text from "components/text/text";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "components/ui/accordion";
import Btn from "components/button/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listDomains,
  deleteDomain,
  checkDomainStatus,
  editDomain,
  verifyDNSRecords,
} from "utils/domainVercel";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { VscError } from "react-icons/vsc";

const validDomainRegex =
  /^[a-zA-Z0-9.-]+\.(com|com\.br|io|net|org|dev|app|ai|co|[a-z]{2,}\.br)$/;

const DomainManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: domains, isLoading: isLoadingDomains } = useQuery({
    queryKey: ["domains"],
    queryFn: listDomains,
  });


  const deleteDomainMutation = useMutation({
    mutationFn: (domain: string) => deleteDomain(domain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });

  const editDomainMutation = useMutation({
    mutationFn: ({
      oldDomain,
      newDomain,
    }: {
      oldDomain: string;
      newDomain: string;
    }) => editDomain(oldDomain, newDomain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });

  return (
    <VStack w="100%" align="stretch">
      <Text.Medium color="neutral" fontSize="18px" fontWeight="500" mb={4}>
        Gerenciamento de Domínios
      </Text.Medium>

      {isLoadingDomains ? (
        <Spinner size="lg" />
      ) : domains?.data?.domains?.length > 0 ? (
        <AccordionRoot
          variant="subtle"
          borderColor="neutral.40"
          spaceY="4"
          collapsible
        >
          {domains?.data.domains.map((domain: { name: string }) => (
            <DomainAccordionItem
              key={domain.name}
              domain={domain}
              onDelete={deleteDomainMutation.mutate}
              onEdit={editDomainMutation.mutate}
              onRefresh={() =>
                queryClient.invalidateQueries({ queryKey: ["domainStatus"] })
              }
              loadingDelete={deleteDomainMutation.isPending}
            />
          ))}
        </AccordionRoot>
      ) : (
        <Text.Medium fontSize="16px">Nenhum domínio cadastrado.</Text.Medium>
      )}
    </VStack>
  );
};

const DomainAccordionItem: React.FC<{
  domain: { name: string };
  loadingDelete: boolean;
  onDelete: (domain: string) => void;
  onEdit: ({
    oldDomain,
    newDomain,
  }: {
    oldDomain: string;
    newDomain: string;
  }) => void;
  onRefresh: () => void;
}> = ({ domain, onDelete, onEdit, onRefresh, loadingDelete }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: domainStatus, isLoading: isDomainLoading } = useQuery({
    queryKey: ["domainStatus", domain.name],
    queryFn: () => checkDomainStatus(domain.name),
    enabled: !!domain.name,
  });

  const { data: dnsRecords, isLoading: isDNSLoading } = useQuery({
    queryKey: ["dnsRecords", domain.name],
    queryFn: () => verifyDNSRecords(domain.name),
    enabled: !!domain.name,
  });
  
  const isConfigured =
    domainStatus?.data?.verified === true &&
    dnsRecords?.misconfigured === false

  const [isEditing, setIsEditing] = useState(false);
  const [editedDomain, setEditedDomain] = useState(domain.name);


  return (
    <AccordionItem
      bg="neutral.60"
      borderColor="neutral.40"
      key={domain.name}
      value={domain.name}
    >
      <Box position="relative">
        <AccordionItemTrigger
          cursor="pointer"
          indicatorPlacement="start"
          p="20px"
        >
          <Flex justify="space-between" alignItems="center" w="100%">
            <Flex alignItems="center" gap="16px">
              {isConfigured ? (
                <IoIosCheckmarkCircle color="#00C851" size={22} />
              ) : (
                <VscError color="red" size={22} />
              )}
              {!isEditing ? (
                <Text.Medium fontSize="16px">{domain.name}</Text.Medium>
              ) : (
                <Input
                  ref={inputRef}
                  value={editedDomain}
                  onChange={(e) => setEditedDomain(e.target.value)}
                  w="200px"
                  color="neutral"
                  px={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      onEdit({
                        oldDomain: domain.name,
                        newDomain: editedDomain,
                      });
                      setIsEditing(false);
                    }
                  }}
                />
              )}
            </Flex>
            <Flex gap="8px">
              <Btn
                color="neutral"
                label="Recarregar status"
                w="200px"
                h="40px"
                bg="transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onRefresh();
                }}
                isLoading={isDomainLoading || isDomainLoading || isDNSLoading}
              />
              {!isEditing ? (
                <Btn
                  color="neutral"
                  label="Editar"
                  w="200px"
                  h="40px"
                  bg="transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                />
              ) : (
                <>
                  <Btn
                    label="Salvar"
                    w="80px"
                    h="40px"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit({
                        oldDomain: domain.name,
                        newDomain: editedDomain,
                      });
                      setIsEditing(false);
                    }}
                    disabled={!validDomainRegex.test(editedDomain)}
                  />
                  <Btn
                    label="Cancelar"
                    bg="transparent"
                    w="80px"
                    h="40px"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditedDomain(domain.name);
                      setIsEditing(false);
                    }}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </AccordionItemTrigger>
      </Box>
      <AccordionItemContent>
        <VStack
          borderWidth="1px solid"
          borderColor="neutral.40"
          p="20px"
          w="100%"
        >
          {isDomainLoading ? (
            <Spinner size="md" />
          ) : isConfigured ? (
            <Text.Medium fontSize="16px" color="green.400">
              O domínio está completamente configurado e funcionando
              corretamente.
            </Text.Medium>
          ) : (
            <VStack align="start" spaceY={4} w="100%">
              <Text.Medium fontSize="16px" color="neutral">
                O domínio ainda não está configurado. Configure os seguintes
                registros DNS:
              </Text.Medium>

              <Box p="8px" bg="neutral.60" borderRadius="5px" w="100%">
                <Text.Medium fontSize="16px" color="neutral">
                  <strong>Tipo:</strong> A <br />
                  <strong>Nome:</strong> @ <br />
                  <strong>Valor:</strong> 76.76.21.21
                </Text.Medium>
              </Box>

              <Box p="8px" bg="neutral.60" borderRadius="5px" w="100%">
                <Text.Medium fontSize="16px" color="neutral">
                  <strong>Tipo:</strong> CNAME <br />
                  <strong>Nome:</strong> www <br />
                  <strong>Valor:</strong> cname.vercel-dns.com
                </Text.Medium>
              </Box>

              <Box p="8px" bg="neutral.60" borderRadius="5px" w="100%">
                <Text.Medium fontSize="16px" color="neutral">
                  <strong>Tipo:</strong> TXT <br />
                  <strong>Nome:</strong> _vercel <br />
                  <strong>Valor:</strong> vc-domain-verify={domain.name}
                </Text.Medium>
              </Box>
            </VStack>
          )}

          <Flex w="100%" justify="flex-end">
            <Btn
              bg="transparent"
              color="neutral"
              w="200px"
              label="Excluir Domínio"
              onClick={() => onDelete(domain.name)}
              isLoading={loadingDelete}
            />
          </Flex>
        </VStack>
      </AccordionItemContent>
    </AccordionItem>
  );
};

export default DomainManagement;
