import {
  Flex,
  Icon,
  Image,
  Table,
  VStack,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Text from "components/text/text";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import React, { useState } from "react";

interface TableViews {
  data?: Product[] | null;
}

const TableViews: React.FC<TableViews> = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Table.ScrollArea
      w="100%"
      overflowX={isMobile ? "auto" : "scroll"}
      borderWidth="1px"
      borderColor="neutral.40"
      rounded="md"
      h="auto"
    >
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row h="60px" bg="neutral.50">
            <Table.ColumnHeader borderColor="neutral.40" color="neutral" px={6}>
              Nome
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" borderColor="neutral.40" color="neutral">
              Visualizações
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" borderColor="neutral.40" color="neutral">
              Tempo de exibição (horas)
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.length ? (
            data.map((item: Product) => (
              <React.Fragment key={item._id}>
                <Table.Row borderTopWidth="1px" borderColor="neutral.40">
                  <Table.Cell
                    p="20px"
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <VStack align="flex-start" w="100%">
                      <Flex gap="12px">
                        <Skeleton
                          loading={!isLoaded}
                          transition="0.2s"
                          w="100px"
                          h="57px"
                        >
                          <Image
                            w="100px"
                            minW="100px"
                            h="57px"
                            onLoad={() => setIsLoaded(true)}
                            src={item?.thumbnail ?? "/images/bg.png"}
                          />
                        </Skeleton>
                        <VStack align="flex-start" w="100%">
                          <Text.Medium fontSize="14px" color="neutral">
                            {item.name}
                          </Text.Medium>
                          <Flex gap="12px" w="100%">
                            <Flex alignItems="center" gap="6px">
                              <Icon color="neutral.10">
                                <OndemandVideoOutlinedIcon />
                              </Icon>
                              <Text.Medium fontSize="12px">
                                {item?.count_modules} módulos
                              </Text.Medium>
                            </Flex>
                            <Flex alignItems="center" gap="6px">
                              <Icon color="neutral.10">
                                <AccessTimeOutlinedIcon />
                              </Icon>
                              <Text.Medium fontSize="12px">
                                {item.duration
                                  ? `${item.duration} horas`
                                  : "0 horas"}
                              </Text.Medium>
                            </Flex>
                          </Flex>
                        </VStack>
                      </Flex>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                    textAlign="center"
                  >
                    {item?.views ?? 0}
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                    textAlign="center"
                  >
                    {item?.watchTime ?? 0}
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))
          ) : (
            <Flex w="100%" p={4}>
              <Text.Medium fontSize="20px">
                Você ainda não possui nenhum infoproduto.
              </Text.Medium>
            </Flex>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableViews;
