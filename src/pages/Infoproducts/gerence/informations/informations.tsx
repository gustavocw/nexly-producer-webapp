import {
  HStack,
  VStack,
  Image,
  Flex,
  Icon,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import SearchBar from "components/search/search";
import SelectOption from "components/selectOption/select";
import Text from "components/text/text";
import MenuItems from "pages/members/menu/menu.members";
import TableMembers from "pages/members/table/table.members";
import { LuPlus } from "react-icons/lu";
import useInformationsController from "./informations.controller";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { membersDummy } from "pages/members";

const Informations = () => {
  const { handleMenuAction, setAccessType, setLastAccess, accessOptions, typeAccessOptions } = useInformationsController();
  return (
    <VStack gap="32px" w="100%">
      <HStack w="100%">
        <VStack
          gap="20px"
          p="20px"
          borderWidth="1px"
          borderColor="neutral.40"
          borderRadius="8px"
          align="flex-start"
          w="70%"
          h="200px"
        >
          <HStack gap="10px">
            <Image borderRadius="8px" w="100px" h="57px" src="/images/bg.png" />
            <Text.Medium fontSize="16px">Nome do curso</Text.Medium>
          </HStack>
          <Divider width="100" />
          <Flex>
            <Text.Medium fontSize="14px">
              O curso "Introdução à Programação em Python" é voltado para
              iniciantes que desejam aprender os conceitos básicos de
              programação utilizando a linguagem Python. Ao longo de quatro
              semanas, os alunos explorarão desde os fundamentos da lógica de
              programação até a criação de pequenos projetos práticos.
            </Text.Medium>
          </Flex>
        </VStack>
        <VStack
          h="200px"
          w="30%"
          padding="20px"
          borderWidth="1px"
          borderColor="neutral.40"
          justify="space-between"
        >
          <HStack w="100%" justify="space-between">
            <Text.Medium fontSize="14px" color="neutral.10">
              Data de criação
            </Text.Medium>
            <Text.Medium fontSize="14px" color="primary">
              20/12/2023
            </Text.Medium>
          </HStack>
          <Divider />
          <HStack w="100%" justify="space-between">
            <Text.Medium fontSize="14px" color="neutral.10">
              Categoria
            </Text.Medium>
            <Text.Medium fontSize="14px" color="primary">
              Desenvolvimento web
            </Text.Medium>
          </HStack>
          <Divider />
          <HStack w="100%" justify="space-between">
            <Text.Medium fontSize="14px" color="neutral.10">
              Compradores totais
            </Text.Medium>
            <Text.Medium fontSize="14px" color="primary">
              320
            </Text.Medium>
          </HStack>
        </VStack>
      </HStack>
      <HStack w="100%" justify="space-between" align="center">
        <HStack justify="space-between" w="100%">
          <Flex w="100%" gap="32px">
            <SelectOption
              onSelectChange={(v) => setAccessType(v)}
              placeholder="Tipo de acesso"
              options={typeAccessOptions}
            />
            <SelectOption
              onSelectChange={(v) => setLastAccess(v)}
              placeholder="Último acesso"
              options={accessOptions}
            />
          </Flex>
          <Flex alignItems="center" justify="flex-end" gap="20px" w="100%">
            <SearchBar placeholder="Pesquisar membros" />
            <Btn w="200px" label="Adicionar membro" iconLeft={<LuPlus />} />
            <MenuRoot positioning={{ placement: "left-start" }}>
              <MenuTrigger asChild>
                <Icon
                  borderWidth="1px"
                  borderRadius="8px"
                  borderColor="neutral.40"
                  fontSize="38px"
                  cursor="pointer"
                  color="neutral"
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
                <MenuItems onAction={handleMenuAction} />
              </MenuContent>
            </MenuRoot>
          </Flex>
        </HStack>
      </HStack>
      <TableMembers data={membersDummy} />
    </VStack>
  );
};

export default Informations;
