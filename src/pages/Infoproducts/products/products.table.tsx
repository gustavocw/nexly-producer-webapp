import {
  Flex,
  Icon,
  Image,
  Table,
  VStack,
  Skeleton
} from "@chakra-ui/react";
import Text from "components/text/text";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import HttpsIcon from "@mui/icons-material/Https";
import PublicIcon from "@mui/icons-material/Public";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "hooks/useProducts";
import useProductStore from "stores/product.store";
import PublishProductModal from "./publish/publish.course";
import DeleteProductModal from "../modals/modal.delete.product";
import CancelDeleteProductModal from "../modals/cancel.delete.product";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";
import { capitalizeFirstLetter } from "utils/captalizeData";

interface TableProducts {
  data?: Product[] | null;
}

const TableProducts: React.FC<TableProducts> = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setProduct } = useProducts();
  const { setProductId } = useProductStore();
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
  const navigate = useNavigate();

  const renderMenuItems = (item: Product, state: string, deldate?: any) => {
    if (deldate) return null;

    return (
      <>
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
          onClick={() => {
            navigate(`/infoproducts/informations/${item._id}`),
              setProduct(item);
            setProductId(item._id);
          }}
        >
          Gerenciar
        </MenuItem>
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
          >
            <PublishProductModal idProduct={item._id} />
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
          onClick={() => {
            navigate("/infoproducts/create", {
              state: { product: item },
            });
          }}
        >
          Editar infoproduto
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
            <DeleteProductModal
              productId={item?._id}
              productName={item?.name}
            />
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
      h="75vh"
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
                  >
                    {capitalizeFirstLetter(item?.category)}
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Flex align="center" justify="center">
                      {renderStatusIcon(item?.state, item?.delDate)}
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
                    {!item?.delDate ? (
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
                        >
                          {renderMenuItems(item, item.state, item.delDate)}
                        </MenuContent>
                      </MenuRoot>
                    ) : (
                      <Flex w="100%" justify="flex-end">
                        <CancelDeleteProductModal
                          productId={item?._id}
                          productName={item?.name}
                        />
                      </Flex>
                    )}
                  </Table.Cell>
                </Table.Row>
                {/* <Table.Row bg="neutral.50">
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
                </Table.Row> */}
              </React.Fragment>
            ))
          ) : (
            <Flex w="100%" p={4}>
              <Text.Medium fontSize="20px">
                Você ainda não possui nenhum infoproduto. Para criar o primeiro,
                clique em "Novo Produto".
              </Text.Medium>
            </Flex>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableProducts;
