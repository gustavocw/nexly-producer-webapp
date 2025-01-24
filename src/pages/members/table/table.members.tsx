import { Flex, Icon, Table } from "@chakra-ui/react";
import Text from "components/text/text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { Avatar } from "components/ui/avatar";
import type { Member } from "types/members";
import { formatDateToString } from "utils/formatDateToString";
import { capitalizeFirstLetter } from "utils/captalizeData";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";
import { useMutation } from "@tanstack/react-query";
import { updateStateMember } from "services/members.services";
import { toaster } from "components/ui/toaster";

interface TableMembersProps {
  data?: Member[] | null;
  areaId?: string;
  refetch: () => void
}

const TableMembers: React.FC<TableMembersProps> = ({ data, refetch }) => {
  console.log(data);
  
  const { mutate: updateState } = useMutation({
    mutationFn: ({ memberId, state }: { memberId: string, state: string }) => updateStateMember(memberId, state),
    onSuccess: () => {
      toaster.create({
        title: "Status de membro alterado com sucesso.",
        type: "success",
      });
      refetch();
    },
  });

  const renderMenuItems = (status: string, memberId: string) => (
    <>
      <MenuItem
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
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        value="block"
        onClick={() => updateState({ memberId, state: status === "ATIVO" ? "BLOQUEADO" : "ATIVO" })}
      >
        {status === "ATIVO" ? "Bloquear Membro" : "Desbloquear Membro"}
      </MenuItem>
    </>
  );

  return (
    <Table.ScrollArea
      w="100%"
      borderWidth="1px"
      borderColor="neutral.40"
      rounded="md"
      maxH="70vh"
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
                      {member?.lastAccess
                        ? formatDateToString(member?.lastAccess)
                        : "Nenhum login"}
                    </Text.Medium>
                  </Table.Cell>
                  <Table.Cell
                    h="60px"
                    color="neutral"
                    bg="neutral.50"
                    border="none"
                  >
                    <Text.Medium
                      textTransform="capitalize"
                      fontSize="14px"
                      color="neutral"
                    >
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
                        borderWidth="1px"
                        borderColor="neutral.40"
                        bg="neutral.50"
                      >
                        {renderMenuItems(member?.stateUser, member?._id)}
                      </MenuContent>
                    </MenuRoot>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))
          ) : (
            <Text.Medium px={2} py={5} fontSize="14px" color="neutral">
              Nenhum membro cadastrado. Selecione acima a área que deseja buscar
              os membros registrados.
            </Text.Medium>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableMembers;
