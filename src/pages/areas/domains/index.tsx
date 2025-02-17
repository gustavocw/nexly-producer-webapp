import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { listDomains, deleteDomain } from "utils/domainVercel";
import Btn from "components/button/button";

const DomainList: React.FC = () => {
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

  return (
    <Box w="400px">
      <Text color="neutral" fontSize="18px" fontWeight="bold" mb={4}>
        Domínios cadastrados: //TODO
      </Text>
      {isLoadingDomains ? (
        <Spinner size="lg" />
      ) : domains?.data?.domains?.length > 0 ? (
        domains?.data.domains.map((domain: any) => (
          <Flex
            color="neutral"
            key={domain.name}
            w="100%"
            justify="space-between"
            align="center"
            borderWidth="1px"
            borderColor="neutral.40"
            p={2}
            borderRadius={4}
            mb={2}
          >
            <Text fontSize="16px">{domain.name}</Text>
            <Btn
              label="X"
              w="10px"
              bg="transparent"
              aria-label="Remover domínio"
              onClick={() => deleteDomainMutation.mutate(domain.name)}
              isLoading={deleteDomainMutation.isPending}
            />
          </Flex>
        ))
      ) : (
        <Text fontSize="16px">Nenhum domínio cadastrado.</Text>
      )}
    </Box>
  );
};

export default DomainList;
