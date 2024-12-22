import {
  Flex,
  Icon,
  Image,
  Table,
  VStack,
  Box,
  Separator,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import Text from "components/text/text";
import type { Product } from "types/product";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import StepProduct from "./step/step";
import HttpsIcon from "@mui/icons-material/Https";
import PublicIcon from "@mui/icons-material/Public";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { to } from "hooks/to";

interface TableProducts {
  data: Product[];
}

const TableProducts: React.FC<TableProducts> = ({ data }) => {
  const renderStatusIcon = (state: string, deldate?: any) => {
    if (deldate) {
      return (
        <Flex gap="2" alignItems="center">
          <Icon color="error.30">
            <CancelIcon />
          </Icon>
          <Text.Medium fontSize="14px">Deletado</Text.Medium>
        </Flex>
      );
    }
    switch (state) {
      case "PUBLICO":
        return (
          <Flex gap="2" alignItems="center">
            <Icon color="success.30">
              <PublicIcon />
            </Icon>
            <Text.Medium fontSize="14px">Público</Text.Medium>
          </Flex>
        );
      case "PRIVADO":
        return (
          <Flex gap="2" alignItems="center">
            <Icon color="warning.30">
              <HttpsIcon />
            </Icon>
            <Text.Medium fontSize="14px">Privado</Text.Medium>
          </Flex>
        );
      default:
        return null;
    }
  };

  const renderMenuItems = (state: string, deldate?: any) => {
    if (deldate) return null;

    return (
      <>
        {state !== "PUBLICO" && (
          <MenuItem
            border="none"
            borderRadius={0}
            _hover={{
              bg: "neutral.40",
            }}
            bg="neutral.50"
            cursor="pointer"
            p={2}
            color="neutral"
            value="post"
            onClick={() => console.log("Publicar curso")}
          >
            Publicar Curso
          </MenuItem>
        )}
        <MenuItem
          border="none"
          borderRadius={0}
          _hover={{
            bg: "neutral.40",
          }}
          bg="neutral.50"
          cursor="pointer"
          p={2}
          color="neutral"
          value="edit"
          onClick={() => to("/infoproducts/informations")}
        >
          Gerenciar
        </MenuItem>
        <MenuItem
          border="none"
          borderRadius={0}
          _hover={{
            bg: "neutral.40",
          }}
          bg="neutral.50"
          cursor="pointer"
          p={2}
          color="neutral"
          value="edit"
          onClick={() => console.log("Editar produto")}
        >
          Editar Infoprodutos
        </MenuItem>
        {state === "PUBLICO" && (
          <MenuItem
            border="none"
            borderRadius={0}
            _hover={{
              bg: "neutral.40",
            }}
            bg="neutral.50"
            cursor="pointer"
            p={2}
            color="neutral"
            value="del"
            onClick={() => console.log("Deletar curso")}
          >
            Deletar Infoprodutos
          </MenuItem>
        )}
      </>
    );
  };

  return (
    <Table.ScrollArea
      w="100%"
      borderWidth="1px"
      borderColor="neutral.40"
      rounded="md"
    >
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row h="60px" bg="neutral.50">
            <Table.ColumnHeader borderColor="neutral.40" color="neutral" px={6}>
              Nome
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor="neutral.40" color="neutral">
              Categoria
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              borderColor="neutral.40"
              color="neutral"
            >
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader
              borderColor="neutral.40"
              color="neutral"
              px={6}
              textAlign="end"
            >
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.map((item) => (
            <React.Fragment key={item.id}>
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
                      <Image w="100px" h="57px" src="/images/bg.png" />
                      <VStack align="flex-start" w="100%">
                        <Text.Medium fontSize="14px" color="neutral">
                          {item.name}
                        </Text.Medium>
                        <Flex gap="12px" minW="100%">
                          <Flex alignItems="center" gap="6px">
                            <Icon color="neutral.10">
                              <OndemandVideoOutlinedIcon />
                            </Icon>
                            <Text.Medium fontSize="12px">
                              {item.models
                                ? `${item.models.length} módulos`
                                : "0 módulos"}
                            </Text.Medium>
                          </Flex>
                          <Flex alignItems="center" gap="6px">
                            <Icon color="neutral.10">
                              <AccessTimeOutlinedIcon />
                            </Icon>
                            <Text.Medium fontSize="12px">
                              {item.duration
                                ? `${item.models.length} módulos`
                                : "0 módulos"}
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
                >
                  {item.category}
                </Table.Cell>
                <Table.Cell
                  h="60px"
                  color="neutral"
                  bg="neutral.50"
                  border="none"
                >
                  <Flex align="center" justify="center">
                    {renderStatusIcon(item.state, item.delDate)}
                  </Flex>
                </Table.Cell>
                <Table.Cell
                  h="60px"
                  color="neutral"
                  bg="neutral.50"
                  border="none"
                  textAlign="end"
                  px={6}
                >
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Icon
                        borderWidth="1px"
                        borderRadius="8px"
                        borderColor="neutral.40"
                        fontSize="30px"
                        cursor="pointer"
                        p="4px"
                      >
                        <MoreVertIcon />
                      </Icon>
                    </MenuTrigger>
                    <MenuContent
                      borderRadius="8px"
                      borderWidth="1px"
                      borderColor="neutral.40"
                      position="absolute"
                    >
                      {renderMenuItems(item.state, item.delDate)}
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
              <Table.Row bg="neutral.50">
                <Table.Cell colSpan={6} py="20px" border="none">
                  <Separator w="97%" mx="auto" borderColor="neutral.40" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell bg="neutral.50" colSpan={4} p={0} border="none">
                  <Box w="100%" bg="neutral.100">
                    <StepProduct />
                  </Box>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableProducts;
