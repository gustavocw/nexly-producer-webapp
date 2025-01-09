import {
  AbsoluteCenter,
  Box,
  createListCollection,
  Flex,
  HStack,
  Icon,
  Image,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  VStack,
} from "@chakra-ui/react";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "components/ui/accordion";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { ModalCreateModule } from "../modal/modal.create.module";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";

interface AccordeonProps {
  modules?: Module[] | null;
}

const Accordeon: React.FC<AccordeonProps> = ({ modules }) => {
  const navigate = useNavigate();
  const collection = createListCollection({
    items: statusModule,
  });

  console.log(modules);

  return (
    <AccordionRoot
      variant="subtle"
      borderColor="neutral.40"
      spaceY="4"
      collapsible
    >
      {modules?.map((module, index) => (
        <AccordionItem bg="neutral.60" key={index} value={module?.id}>
          <Box position="relative">
            <AccordionItemTrigger
              cursor="pointer"
              indicatorPlacement="start"
              p="20px"
            >
              <Flex gap="16px">
                <Flex
                  justify="center"
                  alignItems="center"
                  w="24px"
                  h="24px"
                  bg="primary.50"
                  borderRadius="50%"
                >
                  <Text.Medium fontSize="16px">
                    {module?.lessons?.length}
                  </Text.Medium>
                </Flex>
                <Text.Medium fontSize="16px">{module?.name}</Text.Medium>
              </Flex>
            </AccordionItemTrigger>
            <AbsoluteCenter mr="20px" gap="32px" axis="vertical" insetEnd="0">
              <Icon cursor="pointer">
                <PublicOutlinedIcon />
              </Icon>
              <ModalCreateModule isEdit />
            </AbsoluteCenter>
          </Box>
          <AccordionItemContent>
            <VStack
              borderWidth="1px solid"
              borderColor="neutral.40"
              p="20px"
              w="100%"
            >
              {module.lessons?.length > 0 ? (
                <HStack justify="space-between" w="100%">
                  <Text.Medium fontSize="16px">Aulas</Text.Medium>
                  <Flex position="relative" align="center" gap="32px">
                    <MenuRoot>
                      <MenuTrigger asChild>
                        <Icon
                          borderWidth="1px"
                          borderRadius="8px"
                          borderColor="neutral.40"
                          fontSize="30px"
                          cursor="pointer"
                          color="neutral"
                          p="4px"
                        >
                          <MoreVertIcon />
                        </Icon>
                      </MenuTrigger>
                      <MenuContent
                        w="200px"
                        borderWidth="1px"
                        borderColor="neutral.40"
                        bg="neutral.60"
                        position="absolute"
                        top={2}
                        right={6}
                      >
                        <MenuItem
                          cursor="pointer"
                          p={3}
                          color="neutral"
                          value="rename"
                          _hover={{ bg: "neutral.30" }}
                          onClick={() => {
                            navigate("/infoproducts/create/platfoms");
                          }}
                        >
                          Adicionar várias aulas +2
                        </MenuItem>
                        <MenuItem
                          cursor="pointer"
                          p={3}
                          color="neutral"
                          value="rename"
                          _hover={{ bg: "neutral.30" }}
                          onClick={() => {
                            navigate("/infoproducts/create/video");
                          }}
                        >
                          Adicionar uma aula +1
                        </MenuItem>
                        <MenuItem
                          cursor="pointer"
                          p={3}
                          color="neutral"
                          value="rename"
                          _hover={{ bg: "neutral.30" }}
                          onClick={() => {
                            navigate("/infoproducts/create/platfoms");
                          }}
                        >
                          Editar aulas
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  </Flex>
                </HStack>
              ) : (
                <VStack justify="center" w="100%" spaceY={2}>
                  <Text.Medium fontSize="16px">
                    Este módulo não possui aulas, deseja adicionar ?
                  </Text.Medium>
                  <HStack gap={2} justify="center" mx="auto" w="100%">
                    <Btn
                      onClick={() => navigate("/infoproducts/create/platfoms")}
                      w="20%"
                      iconLeft={<HiPlus />}
                      label="Adicionar aulas via integração"
                    />
                    <Btn
                      onClick={() => navigate("/infoproducts/create/video")}
                      w="20%"
                      iconLeft={<HiPlus />}
                      label="Adicionar uma aula única"
                    />
                  </HStack>
                </VStack>
              )}
            </VStack>
            <Divider width="100%" />
            {module?.lessons?.map((lesson, index) => (
              <VStack
                borderWidth="1px solid"
                borderColor="neutral.40"
                w="100%"
                key={lesson?.id}
              >
                <HStack p="20px" justify="space-between" w="100%">
                  <Flex alignItems="center" gap="20px">
                    <Icon>
                      <DehazeOutlinedIcon />
                    </Icon>
                    <Image
                      w="100px"
                      h="56px"
                      borderRadius="8px"
                      src="/images/bg.png"
                    />
                    <Text.Medium fontSize="16px">
                      {lesson.nameLesson}
                    </Text.Medium>
                  </Flex>
                  <Flex alignItems="center" gap="72px">
                    <Flex alignItems="center" gap="8px" w="100px">
                      <Icon cursor="pointer">
                        <PublicOutlinedIcon />
                      </Icon>
                      <SelectRoot
                        _icon={{
                          color: "#fff",
                        }}
                        collection={collection}
                        size="sm"
                        width="320px"
                        defaultValue={["public"]}
                      >
                        <SelectTrigger cursor="pointer" border="none" w="100px">
                          <SelectValueText placeholder="Select movie" />
                        </SelectTrigger>
                        <SelectContent
                          border="1px solid"
                          borderColor="neutral.40"
                          h="100px"
                          bg="neutral.60"
                          position="absolute"
                        >
                          {statusModule?.map((status) => (
                            <SelectItem
                              defaultValue="public"
                              cursor="pointer"
                              px="10px"
                              _hover={{
                                bg: "neutral.70",
                              }}
                              item={status}
                              key={status.value}
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </Flex>
                    <MenuRoot>
                      <MenuTrigger asChild>
                        <Icon
                          borderWidth="1px"
                          borderRadius="8px"
                          borderColor="neutral.40"
                          fontSize="30px"
                          cursor="pointer"
                          color="neutral"
                          p="4px"
                        >
                          <MoreVertIcon />
                        </Icon>
                      </MenuTrigger>
                      <MenuContent
                        borderWidth="1px"
                        borderColor="neutral.40"
                        bg="neutral.60"
                        position="absolute"
                      >
                        <MenuItem
                          cursor="pointer"
                          p={3}
                          color="neutral"
                          value="rename"
                          _hover={{ bg: "neutral.30" }}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          p={3}
                          value="delete"
                          cursor="pointer"
                          color="error.30"
                          _hover={{ bg: "neutral.30" }}
                        >
                          Excluir...
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  </Flex>
                </HStack>
                {index < module?.lessons.length - 1 && <Divider width="100%" />}
              </VStack>
            ))}
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

const statusModule = [
  { label: `Público`, value: "public" },
  { label: `Privado`, value: "private" },
];

export default Accordeon;
