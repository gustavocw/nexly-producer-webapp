import { Flex, HStack, Separator, Stack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import InfoproductsController from "./index.controller";
import SearchBar from "components/search/search";
import BooksIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCategoryProduct } from "./modals/modal.category";
import ProductsTable from "./products/products.table";
import { StateModule, type Product } from "types/product";

const Infoproducts = () => {
  const { categoryOptions, statusOptions, setCategory, setStatus } =
    InfoproductsController();

  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" pt={5}>
        <Text.Medium fontSize="24px">
          Meus Cursos ({products.length})
        </Text.Medium>
      </VStack>
      {products?.length === 0 ? (
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
      ) : (
        <ProductsTable data={products} />
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
    description: "Aprenda a criar aplicações web completas com HTML, CSS, e JavaScript.",
    category: ["Programação", "Desenvolvimento Web"],
    duration: "10h",
    delDate: null,
    producerId: "producer1",
    state: StateModule.PUBLICO,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-10T15:00:00Z",
    models: [
      {
        id: "module1",
        stateModule: StateModule.PUBLICO,
        name: "Introdução à Programação Web",
        description: "Entenda os fundamentos de HTML, CSS, e JavaScript.",
        delDate: null,
        channelIdChanged: "channel1",
        playlistIdChanged: null,
        courseYtId: "yt_course1",
        createdAt: "2024-12-01T10:10:00Z",
        updatedAt: "2024-12-01T10:10:00Z",
        lessons: [],
      },
      {
        id: "module2",
        stateModule: StateModule.PUBLICO,
        name: "Avançando em Desenvolvimento Web",
        description: "Crie aplicações web dinâmicas com React e Node.js.",
        delDate: null,
        channelIdChanged: "channel1",
        playlistIdChanged: null,
        courseYtId: "yt_course2",
        createdAt: "2024-12-02T11:00:00Z",
        updatedAt: "2024-12-02T11:00:00Z",
        lessons: [],
      },
    ],
  },
  {
    id: "2",
    isCertificate: false,
    name: "Curso de Design Gráfico",
    urlThumbCourse: "https://example.com/graphic-design-course-thumbnail.jpg",
    description: "Explore técnicas de design gráfico e crie peças visuais incríveis.",
    category: ["Design", "Criatividade"],
    duration: "8h",
    delDate: null,
    producerId: "producer2",
    state: StateModule.PRIVADO,
    createdAt: "2024-11-15T14:00:00Z",
    updatedAt: "2024-12-01T14:30:00Z",
    models: [
      {
        id: "module1",
        stateModule: StateModule.PUBLICO,
        name: "Fundamentos de Design Gráfico",
        description: "Aprenda os princípios básicos do design gráfico.",
        delDate: null,
        channelIdChanged: "channel2",
        playlistIdChanged: null,
        courseYtId: "yt_course3",
        createdAt: "2024-11-15T15:00:00Z",
        updatedAt: "2024-11-15T15:00:00Z",
        lessons: [],
      },
      {
        id: "module2",
        stateModule: StateModule.PUBLICO,
        name: "Design Avançado com Illustrator",
        description: "Descubra ferramentas avançadas do Adobe Illustrator.",
        delDate: null,
        channelIdChanged: "channel2",
        playlistIdChanged: null,
        courseYtId: "yt_course4",
        createdAt: "2024-11-20T16:00:00Z",
        updatedAt: "2024-11-20T16:00:00Z",
        lessons: [],
      },
    ],
  },
];

export default Infoproducts;
