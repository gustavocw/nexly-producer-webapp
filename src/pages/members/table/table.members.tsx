import {
  Flex,
  Icon,
  Table,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import Text from "components/text/text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { Avatar } from "components/ui/avatar";
import type { Member } from "types/members";
import { formatDateToString } from "utils/formatDateToString";
import { capitalizeFirstLetter } from "utils/captalizeData";

interface TableMembersProps {
  data?: Member[] | null;
}

const TableMembers: React.FC<TableMembersProps> = ({ data }) => {
  console.log(data);
  
  const renderMenuItems = (status: string) => (
    <>
      <MenuItem
        border="none"
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        value="edit"
        onClick={() => console.log("Editar membro")}
      >
        Editar Membro
      </MenuItem>
      <MenuItem
        border="none"
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        value="block"
        onClick={() =>
          console.log(
            status === "Ativo" ? "Bloquear membro" : "Desbloquear membro"
          )
        }
      >
        {status === "Ativo" ? "Bloquear Membro" : "Desbloquear Membro"}
      </MenuItem>
    </>
  );
  return (
    <Table.ScrollArea
      w="100%"
      borderWidth="1px"
      borderColor="neutral.40"
      rounded="md"
    >
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row h="60px" bg="neutral.50">
            <Table.ColumnHeader borderColor="neutral.40" color="neutral" px={6}>
              Nome
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor="neutral.40" color="neutral">
              Email
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor="neutral.40" color="neutral">
              Último Acesso
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor="neutral.40" color="neutral">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader
              borderColor="neutral.40"
              color="neutral"
              px={6}
              textAlign="end"
            >
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data && data?.length > 0 ? (
            data?.map((member: Member) => (
              <React.Fragment key={member?._id}>
                <Table.Row borderTopWidth="1px" borderColor="neutral.40">
                  <Table.Cell
                    p="20px"
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Flex align="center" gap="12px">
                      <Avatar name={member?.name} />
                      <Text.Medium fontSize="14px" color="neutral">
                        {member?.name}
                      </Text.Medium>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Text.Medium fontSize="14px" color="neutral">
                      {member?.email}
                    </Text.Medium>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Text.Medium fontSize="14px" color="neutral">
                      {member?.lastAccess ? formatDateToString(member?.lastAccess) : "Nenhum login"}
                    </Text.Medium>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Text.Medium textTransform="capitalize" fontSize="14px" color="neutral">
                      {capitalizeFirstLetter(member?.stateUser)}
                    </Text.Medium>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                    textAlign="end"
                    px={6}
                  >
                    <MenuRoot>
                      <MenuTrigger asChild>
                        <Icon
                          borderWidth="1px"
                          borderRadius="8px"
                          borderColor="neutral.40"
                          fontSize="30px"
                          cursor="pointer"
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
                        {renderMenuItems(member?.stateUser)}
                      </MenuContent>
                    </MenuRoot>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))
          ) : (
            <Text.Medium px={2} py={5} fontSize="14px" color="neutral">
              Nenhum membro cadastrado.
            </Text.Medium>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableMembers;
