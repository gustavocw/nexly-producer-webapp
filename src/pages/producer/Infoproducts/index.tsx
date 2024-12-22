import { Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import SearchBar from "components/search/search";
import BooksIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCategoryProduct } from "./modals/modal.category";
import TableProducts from "./products/products.table";
import { type Product } from "types/product";
import useInfoproductsController from "./index.controller";

const Infoproducts = () => {
  const { categoryOptions, statusOptions, setCategory, setStatus } =
    useInfoproductsController();

  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" pt={5}>
        <Text.Medium fontSize="24px">
          Meus Cursos ({products.length})
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
                Você ainda não possui um curso
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

const products: Product[] = [
  {
    id: "1",
    isCertificate: true,
    name: "Curso de Programação Web",
    urlThumbCourse: "https://example.com/web-course-thumbnail.jpg",
    description:
      "Aprenda a criar aplicações web completas com HTML, CSS, e JavaScript.",
    category: ["Programação", "Desenvolvimento Web"],
    duration: "10h",
    delDate: null,
    producerId: "producer1",
    state: "PUBLICO",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-10T15:00:00Z",
    models: [],
  },
  {
    id: "2",
    isCertificate: false,
    name: "Curso de Design Gráfico",
    urlThumbCourse: "https://example.com/graphic-design-course-thumbnail.jpg",
    description:
      "Explore técnicas de design gráfico e crie peças visuais incríveis.",
    category: ["Design", "Criatividade"],
    duration: "8h",
    delDate: null,
    producerId: "producer2",
    state: "PRIVADO",
    createdAt: "2024-11-15T14:00:00Z",
    updatedAt: "2024-12-01T14:30:00Z",
    models: [],
  },
];

export default Infoproducts;
