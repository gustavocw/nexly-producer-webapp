import {
  Flex,
  HStack,
  Icon,
  Stack,
  Tabs,
  VStack,
  Text,
} from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import TableMembers from "./table/table.members";
import SearchBar from "components/search/search";
import SelectOption from "components/selectOption/select";
import useMembersController from "./index.controller";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalCreateMember from "./creare/modal.create.members";
import type { Member } from "types/members";
import { FaUsers } from "react-icons/fa";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";
import { useProducts } from "hooks/useProducts";
import { BsArrowRight } from "react-icons/bs";
import Btn from "components/button/button";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ onAction }: { onAction: (action: string) => void }) => {
  return (
    <>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        onClick={() => onAction("export")}
        borderRadius={0}
      >
        Exportar Lista Atual
      </MenuItem>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        borderRadius={0}
        onClick={() => onAction("import")}
      >
        Importar Lista
      </MenuItem>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        borderRadius={0}
        p={2}
        color="neutral"
        onClick={() => onAction("bulkDelete")}
      >
        Excluir em Massa
      </MenuItem>
    </>
  );
};

const Members = () => {
  const {
    areaId,
    members,
    accessOptions,
    handleMenuAction,
    typeAccessOptions,
    areasList,
    setSearch,
    handleSetAreaId,
    refetchMembers,
    defaultArea,
  } = useMembersController();
  const { products } = useProducts();
  const navigate = useNavigate();
  const bloquedMembers = members?.filter(
    (member: Member) => member.stateUser === "BLOQUEADO"
  ).length;
  const optionsNav = [
    { label: `Ativos ${members?.length ?? 0}`, value: "ATIVO" },
    { label: `Bloqueados ${bloquedMembers ?? 0}`, value: "BLOQUEADO" },
    { label: `Colaboradores ${bloquedMembers ?? 0}`, value: "COLABORADOR" },
  ];

  console.log(defaultArea);
  

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    setSearch(selectedOption.value);
  };
  return (
    <Stack gap="32px" px={8}>
      <Tabs.Root>
        <NavOptions
          pt="10"
          defaultValue={optionsNav[0]?.value}
          options={optionsNav}
          onChange={handleSelectionChange}
        />
      </Tabs.Root>
      <HStack w="100%" justify="space-between" align="center">
        <HStack justify="space-between" w="100%">
          <Flex w="100%" gap="32px">
            <SelectOption
              onSelectChange={(v) => handleSetAreaId(v)}
              placeholder="Área"
              options={areasList}
              value={defaultArea}
            />
            <SelectOption
              onSelectChange={(v) => setSearch(v)}
              placeholder="Tipo de acesso"
              options={typeAccessOptions}
            />
            <SelectOption
              onSelectChange={(v) => setSearch(v)}
              placeholder="Último acesso"
              options={accessOptions}
            />
          </Flex>
          <Flex alignItems="center" justify="flex-end" gap="20px" w="100%">
            <SearchBar
              onChange={(value) => setSearch(value)}
              placeholder="Pesquisar membros"
            />
            <ModalCreateMember refetch={refetchMembers} />
            <MenuRoot positioning={{ placement: "left-start" }}>
              <MenuTrigger
                asChild
              >
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
              >
                <MenuItems onAction={handleMenuAction} />
              </MenuContent>
            </MenuRoot>
          </Flex>
        </HStack>
      </HStack>
      {products?.length === undefined  && members?.length === undefined ? (
        <VStack
          w="100%"
          py="32px"
          px="10px"
          gap="20px"
          boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
        >
          <Icon fontSize="44px" color="neutral">
            <FaUsers />
          </Icon>
          <VStack gap="10px" lineHeight={1.5} w="100%">
            <Text textAlign="center" maxW="70%" fontSize="24px" color="neutral">
              Para ter membros ou adicionar membros, primeiro voce deve ter um
              info produto com uma área de membro ativa.
            </Text>
            <Btn
              iconRight={<BsArrowRight />}
              w="260px"
              label="Ir para info produtos"
              onClick={() => navigate("/infoproducts")}
            />
          </VStack>
        </VStack>
      ) : !!products && !!members ? (
        <VStack
          w="100%"
          py="32px"
          px="10px"
          gap="20px"
          boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
        >
          <Icon fontSize="44px" color="neutral">
          <FaUsers />
          </Icon>
          <VStack gap="10px" lineHeight={1.5} w="100%">
            <Text textAlign="center" fontSize="24px" color="neutral">
              Não há membros cadastrados. Adicione um novo membro clicando no
              botão "Adicionar membro".
            </Text>
          </VStack>
        </VStack>
      ) : (
        <TableMembers refetch={refetchMembers} areaId={areaId} data={members} />
      )}
    </Stack>
  );
};

export default Members;
