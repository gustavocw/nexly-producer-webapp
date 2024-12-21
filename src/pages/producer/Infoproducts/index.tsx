import { Flex, HStack, Separator, Stack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import InfoproductsController from "./index.controller";
import SearchBar from "components/search/search";
import BooksIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCategoryProduct } from "./modals/modal.category";

const Infoproducts = () => {
  const { categoryOptions, statusOptions, setCategory, setStatus } =
    InfoproductsController();

  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" pt={5}>
        <Text.Medium fontSize="24px">Meus Cursos (0)</Text.Medium>
      </VStack>
      <VStack gap="32px" w="100%">
        <HStack w="100%" justify="space-between" align="center">
          <Flex gap="32px">
            <SelectOption
              onSelectChange={(v) => setCategory(v)}
              placeholder="Categoria"
              options={categoryOptions}
            />
            <Separator
              borderRight="1px solid"
              borderColor="neutral.40"
              orientation="vertical"
              height="60px"
              my="auto"
            />
            <SelectOption
              onSelectChange={(v) => setStatus(v)}
              placeholder="Status"
              options={statusOptions}
            />
          </Flex>
          <SearchBar />
        </HStack>
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
              Você ainda não possui um curso
            </Text.Medium>
            <Text.Medium fontSize="20px" color="neutral.10">
              Crie seu curso personalizado e compartilhe seu conhecimento
            </Text.Medium>
          </VStack>
          <ModalCategoryProduct />
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Infoproducts;
