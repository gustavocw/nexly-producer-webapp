import { Flex, HStack, Icon, Stack, Tabs } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import TableMembers from "./table/table.members";
import SearchBar from "components/search/search";
import SelectOption from "components/selectOption/select";
import useMembersController from "./index.controller";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalCreateMember from "./creare/modal.create.members";
import type { Member } from "types/members";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";

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
  } = useMembersController();
  const bloquedMembers = members?.filter(
    (member: Member) => member.stateUser === "BLOQUEADO"
  ).length;
  const optionsNav = [
    { label: `Ativos ${members?.length}`, value: "actives" },
    { label: `Bloqueados ${bloquedMembers}`, value: "blocked" },
  ];

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
  };
  return (
    <Stack gap="32px" px={8}>
      <Tabs.Root>
        <NavOptions
          pt="10"
          defaultValue={optionsNav[0].value}
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
            <SearchBar onChange={(value) => setSearch(value)} placeholder="Pesquisar membros" />
            <ModalCreateMember refetch={refetchMembers} />
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
              >
                <MenuItems onAction={handleMenuAction} />
              </MenuContent>
            </MenuRoot>
          </Flex>
        </HStack>
      </HStack>
      <TableMembers areaId={areaId} data={members} />
    </Stack>
  );
};

export default Members;
