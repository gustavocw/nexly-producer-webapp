import {
  Flex,
  HStack,
  Icon,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Stack,
} from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import type { Member } from "types/members";
import TableMembers from "./table/table.members";
import Btn from "components/button/button";
import SearchBar from "components/search/search";
import SelectOption from "components/selectOption/select";
import { LuPlus } from "react-icons/lu";
import useMembersController from "./index.controller";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  const {setAccessType, setLastAccess, accessOptions, handleMenuAction, typeAccessOptions} = useMembersController();
  const optionsNav = [
    { label: `Ativos ${2}`, value: "actives" },
    { label: `Bloqueados ${5}`, value: "blocked" },
  ];

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
  };
  return (
    <Stack gap="32px" px={8}>
      <NavOptions
        pt="10"
        defaultValue={optionsNav[0].value}
        options={optionsNav}
        onChange={handleSelectionChange}
      />
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
    </Stack>
  );
};

export const membersDummy: Member[] = [
  {
    courseId: "course_001",
    createdAt: "2024-10-10T08:30:00Z",
    id: "member_001",
    username: "john_doe",
    email: "john.doe@example.com",
    idUser: "user_001",
    provider: "email",
    stateUser: "Ativo",
    updatedAt: "2024-10-15T10:00:00Z",
    studentMember: {
      id: undefined,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        number: "10001",
        codeStreet: "",
        neighborhood: "",
        complement: "",
      },
      bio: "A passionate learner.",
      code: "JD123",
      codeDate: "2024-01-01",
      cpf: "123.456.789-10",
      createAt: "2024-01-01T08:00:00Z",
      email: "john.doe@example.com",
      lastname: "Doe",
      name: "John",
      password: "hashed_password",
      phone: "+1-555-1234",
      photo: "https://example.com/photo/john_doe.jpg",
      sex: "Male",
      student: "true",
      updatedAt: "2024-10-10T08:30:00Z",
    },
  },
  {
    courseId: "course_002",
    createdAt: "2024-09-05T14:00:00Z",
    id: "member_002",
    username: "jane_smith",
    email: "jane.smith@example.com",
    idUser: "user_002",
    provider: "google",
    stateUser: "Inativo",
    updatedAt: "2024-09-10T16:00:00Z",
    studentMember: {
      id: undefined,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        number: "10001",
        codeStreet: "",
        neighborhood: "",
        complement: "",
      },
      bio: "Enjoys creative courses.",
      code: "JS789",
      codeDate: "2024-02-01",
      cpf: "234.567.890-20",
      createAt: "2024-02-01T10:00:00Z",
      email: "jane.smith@example.com",
      lastname: "Smith",
      name: "Jane",
      password: "hashed_password",
      phone: "+1-555-5678",
      photo: "https://example.com/photo/jane_smith.jpg",
      sex: "Female",
      student: "true",
      updatedAt: "2024-09-05T14:00:00Z",
    },
  },
  {
    courseId: "course_003",
    createdAt: "2024-08-01T12:00:00Z",
    id: "member_003",
    username: "alice_wonder",
    email: "alice.wonder@example.com",
    idUser: "user_003",
    provider: "facebook",
    stateUser: "Ativo",
    updatedAt: "2024-08-10T14:00:00Z",
    studentMember: {
      id: undefined,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        number: "10001",
        codeStreet: "",
        neighborhood: "",
        complement: "",
      },
      bio: "Loves online learning.",
      code: "AW456",
      codeDate: "2024-03-01",
      cpf: "345.678.901-30",
      createAt: "2024-03-01T09:00:00Z",
      email: "alice.wonder@example.com",
      lastname: "Wonder",
      name: "Alice",
      password: "hashed_password",
      phone: "+1-555-8910",
      photo: "https://example.com/photo/alice_wonder.jpg",
      sex: "Female",
      student: "true",
      updatedAt: "2024-08-01T12:00:00Z",
    },
  },
];

export default Members;
