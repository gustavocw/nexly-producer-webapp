import { Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import SearchBar from "components/search/search";
import BooksIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCategoryProduct } from "./modals/modal.category";
import TableProducts from "./products/products.table";
import useInfoproductsController from "./index.controller";

const Infoproducts = () => {
  const { categoryOptions, statusOptions, setCategory, setStatus, setAreaId, products, areasList } =
    useInfoproductsController();
    

  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" pt={5}>
        <Text.Medium fontSize="24px">
          Meus Infoprodutos ({products?.length})
        </Text.Medium>
      </VStack>
      {products?.length === 0 ? (
        <VStack gap="32px" w="100%">
          <VStack
            w="100%"
            py="32px"
            px="10px"
            gap="20px"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          >
            <BooksIcon width="42px" />
            <VStack gap="10px" lineHeight={1.5} w="100%">
              <Text.Medium fontSize="24px" color="neutral">
                Você ainda não possui um infoproduto
              </Text.Medium>
              <Text.Medium fontSize="20px" color="neutral.10">
                Crie seu curso personalizado e compartilhe seu conhecimento
              </Text.Medium>
            </VStack>
            <ModalCategoryProduct />
          </VStack>
        </VStack>
      ) : (
        <VStack gap="20px">
          <HStack w="100%" justify="space-between" align="center">
            <HStack justify="space-between" w="100%">
              <Flex w="100%" gap="32px">
              <SelectOption
                  onSelectChange={(v) => setAreaId(v)}
                  placeholder="Área"
                  options={areasList}
                />
                <SelectOption
                  onSelectChange={(v) => setCategory(v)}
                  placeholder="Categoria"
                  options={categoryOptions}
                />
                <SelectOption
                  onSelectChange={(v) => setStatus(v)}
                  placeholder="Status"
                  options={statusOptions}
                />
              </Flex>
              <Flex alignItems="center" justify="flex-end" gap="20px" w="100%">
                <SearchBar placeholder="Pesquisar produto" />
                <ModalCategoryProduct />
              </Flex>
            </HStack>
          </HStack>
          <TableProducts data={products} />
        </VStack>
      )}
    </Stack>
  );
};

export default Infoproducts;
