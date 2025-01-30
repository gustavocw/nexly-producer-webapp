import { Flex, HStack, Icon, Stack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import SearchBar from "components/search/search";
import BooksIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCategoryProduct } from "./modals/modal.category";
import TableProducts from "./products/products.table";
import useInfoproductsController from "./index.controller";
import useProductStore from "stores/product.store";
import { useProducts } from "hooks/useProducts";
import { BsArrowRight, BsTextareaResize } from "react-icons/bs";
import Btn from "components/button/button";
import { useNavigate } from "react-router-dom";

const Infoproducts = () => {
  const {
    categoryOptions,
    statusOptions,
    handleSetAreaId,
    products,
    areasList,
    isLoadingProducts,
  } = useInfoproductsController();
  const navigate = useNavigate();
  const { setSearch, search } = useProductStore();
  const { areas } = useProducts();

  const hasSearch = (search ?? "").trim().length > 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" pt={5}>
        <Text.Medium fontSize="24px">
          Meus Infoprodutos {products?.length && `(${products?.length})`}
        </Text.Medium>
      </VStack>

      <VStack gap="20px">
        <HStack w="100%" justify="space-between" align="center">
          <HStack justify="space-between" w="100%">
            <Flex w="100%" gap="32px">
              <SelectOption
                onSelectChange={(v) => handleSetAreaId(v)}
                placeholder="Área"
                options={areasList}
              />
              <SelectOption
                onSelectChange={handleSearchChange}
                placeholder="Categoria"
                options={categoryOptions}
              />
              <SelectOption
                onSelectChange={handleSearchChange}
                placeholder="Status"
                options={statusOptions}
              />
            </Flex>
            <Flex alignItems="center" justify="flex-end" gap="20px" w="100%">
              <SearchBar
                onChange={handleSearchChange}
                placeholder="Pesquisar produto"
              />
              <ModalCategoryProduct />
            </Flex>
          </HStack>
        </HStack>
      </VStack>
      {products?.length === undefined || products?.length === 0 && !isLoadingProducts ? (
        hasSearch ? (
          <VStack gap="32px" w="100%">
            <VStack
              w="100%"
              py="32px"
              px="10px"
              gap="20px"
              boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            >
              <Icon fontSize="58px" color="neutral">
                <BooksIcon width="58px" />
              </Icon>
              <VStack gap="32px" lineHeight={1.5} w="100%">
                <Text.Medium fontSize="24px" color="neutral">
                  Nenhum produto encontrado
                </Text.Medium>
                <Text.Medium fontSize="20px" color="neutral.10">
                  Tente ajustar os filtros ou refinar sua pesquisa
                </Text.Medium>
              </VStack>
            </VStack>
          </VStack>
        ) : (
          <VStack gap="32px" w="100%">
            <VStack
              w="100%"
              py="32px"
              px="10px"
              gap="20px"
              boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            >
              <Icon fontSize="58px" color="neutral">
                <BooksIcon width="58px" />
              </Icon>
              <VStack gap="32px" lineHeight={1.5} w="100%">
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
        )
      ) : (
        <VStack align="flex-start" gap="20px">
          {areas?.length === 0 || areas?.length === undefined ? (
            <VStack
              w="100%"
              py="32px"
              px="10px"
              gap="20px"
              boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            >
              <Icon fontSize="58px" color="neutral">
                <BsTextareaResize />
              </Icon>
              <VStack gap="32px" lineHeight={1.5} w="100%">
                <Text.Medium fontSize="24px" color="neutral">
                  Você ainda não criou uma área de membro, clique em "Nova área"
                  para criar uma.
                </Text.Medium>
                <Btn
                  iconRight={<BsArrowRight />}
                  w="260px"
                  label="Ir para áreas de membro"
                  onClick={() => navigate("/areas")}
                />
              </VStack>
            </VStack>
          ) : (
            <TableProducts data={products} />
          )}
        </VStack>
      )}
    </Stack>
  );
};

export default Infoproducts;
