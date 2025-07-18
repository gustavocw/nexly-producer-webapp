import { HStack, VStack, Image, Flex, Icon } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import SearchBar from "components/search/search";
import SelectOption from "components/selectOption/select";
import Text from "components/text/text";
import MenuItems from "pages/members/menu/menu.members";
import TableMembers from "pages/members/table/table.members";
import useInformationsController from "./informations.controller";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDateToString } from "utils/formatDateToString";
import ModalCreateMember from "pages/members/creare/modal.create.members";
import { MenuContent, MenuRoot, MenuTrigger } from "components/ui/menu";
import { FaUsers } from "react-icons/fa";
import { categoryOptions } from "utils/categoryProducts";
import ModalWebhookHotmart from "pages/members/modal/ModalWebHook";

const Informations: React.FC<{ data?: Product | null }> = ({ data }) => {
  const {
    handleMenuAction,
    refetchMembers,
    setSeach,
    accessOptions,
    typeAccessOptions,
    members,
  } = useInformationsController();

  const categoryLabel = categoryOptions.find(option => option.value === data?.category)?.label || data?.category;
  
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
            <Image
              borderRadius="8px"
              w="100px"
              h="57px"
              src={data?.thumbnail ?? "/images/bg.png"}
            />
            <Text.Medium fontSize="16px">{data?.name}</Text.Medium>
          </HStack>
          <Divider width="100" />
          <Flex overflowY="auto">
            <Text.Medium fontSize="14px">{data?.description}</Text.Medium>
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
              {formatDateToString(data?.createdAt)}
            </Text.Medium>
          </HStack>
          <Divider />
          <HStack w="100%" justify="space-between">
            <Text.Medium fontSize="14px" color="neutral.10">
              Categoria
            </Text.Medium>
            <Text.Medium fontSize="14px" color="primary">
              {categoryLabel}
            </Text.Medium>
          </HStack>
          <Divider />
          <HStack w="100%" justify="space-between">
            <Text.Medium fontSize="14px" color="neutral.10">
              Compradores totais
            </Text.Medium>
            <Text.Medium fontSize="14px" color="primary">
              {data?.count_members}
            </Text.Medium>
          </HStack>
        </VStack>
      </HStack>
      <HStack w="100%" justify="space-between" align="center">
        <HStack justify="space-between" w="100%">
          <Flex w="100%" gap="32px">
            <SelectOption
              onSelectChange={(v) => setSeach(v)}
              placeholder="Tipo de acesso"
              options={typeAccessOptions}
            />
            <SelectOption
              onSelectChange={(v) => setSeach(v)}
              placeholder="Último acesso"
              options={accessOptions}
            />
          </Flex>
          <Flex alignItems="center" justify="flex-end" gap="20px" w="100%">
            <SearchBar
              onChange={(value) => setSeach(value)}
              placeholder="Pesquisar membros"
            />
            <ModalCreateMember refetch={refetchMembers} />
            <ModalWebhookHotmart />
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
      {members?.length === 0 ? (
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
            <Text.Medium
              textAlign="center"
              maxW="70%"
              fontSize="24px"
              color="neutral"
            >
              Este info produto ainda não possui nenhum membro.
            </Text.Medium>
          </VStack>
        </VStack>
      ) : (
        <TableMembers refetch={refetchMembers} data={members} />
      )}
    </VStack>
  );
};

export default Informations;
