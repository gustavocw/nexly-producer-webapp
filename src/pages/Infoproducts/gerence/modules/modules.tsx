import { Flex, HStack, VStack } from "@chakra-ui/react";
import ModulesIcon from "assets/icons/BooksIcon";
import Text from "components/text/text";
import { ModalCreateModule } from "./modal/modal.create.module";
import Accordeon from "./accordeon/accordeon";

interface ModulesProps {
  data?: Product | null;
}

const Modules: React.FC<ModulesProps> = ({ data }) => {
  console.log(data?.modules);

  const hasNoModules =
    data?.modules?.length === 1 &&
    data?.modules[0]?._id === null &&
    data?.modules[0]?.lessons_count === 0;

  return (
    <Flex w="100%">
      {hasNoModules ? (
        <HStack gap="32px" w="100%">
          <VStack
            w="100%"
            py="32px"
            px="10px"
            gap="20px"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          >
            <ModulesIcon width="42px" />
            <VStack gap="10px" lineHeight={1.5} w="100%">
              <Text.Medium fontSize="24px" color="neutral">
                O curso não possui módulos
              </Text.Medium>
              <ModalCreateModule />
            </VStack>
          </VStack>
        </HStack>
      ) : (
        <VStack w="100%">
          <Accordeon modules={data?.modules} />
        </VStack>
      )}
    </Flex>
  );
};

export default Modules;
