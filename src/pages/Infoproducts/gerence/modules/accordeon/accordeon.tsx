import {
  AbsoluteCenter,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalCreateModule } from "../modal/modal.create.module";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";
import { getLessons } from "services/product.services";
import { capitalizeFirstLetter } from "utils/captalizeData";
import useProductStore from "stores/product.store";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";

interface AccordeonProps {
  modules?: Module[] | null;
}

const Accordeon: React.FC<AccordeonProps> = ({ modules }) => {
  const navigate = useNavigate();
  const { setModuleId } = useProductStore();
  const [moduleLessons, setModuleLessons] = useState<Record<string, Lesson[]>>(
    {}
  );
  const fetchLessons = async (moduleId: string) => {
    if (moduleLessons[moduleId]) return;
    const lessons = await getLessons(moduleId);
    setModuleLessons((prev) => ({ ...prev, [moduleId]: lessons }));
  };
  const hasLessons = modules?.some(module => module.lessons_count > 0);
  console.log(hasLessons);
  

  return (
    <AccordionRoot
      variant="subtle"
      borderColor="neutral.40"
      spaceY="4"
      collapsible
    >
      {modules?.map((module) => (
        <AccordionItem
          bg="neutral.60"
          key={module._id}
          value={module?._id}
          onClick={() => {
            fetchLessons(module._id);
          }}
        >
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
                    {module.lessons_count}
                  </Text.Medium>
                </Flex>
                <Text.Medium fontSize="16px">{module.name}</Text.Medium>
              </Flex>
            </AccordionItemTrigger>
            <AbsoluteCenter mr="20px" gap="32px" axis="vertical" insetEnd="0">
              {moduleLessons[module._id]?.length > 0 && (
                <Flex gap={2}>
                  <Btn
                    bg="transparent"
                    w="10px"
                    label="+1"
                    onClick={() =>
                      navigate(`/infoproducts/create/video/${module._id}`)
                    }
                  />
                  <Btn
                    bg="transparent"
                    w="10px"
                    label="+2"
                    onClick={() => {
                      navigate(`/infoproducts/create/platfoms/${module._id}`),
                        setModuleId(module._id);
                    }}
                  />
                </Flex>
              )}
              <Icon cursor="pointer">
                <PublicOutlinedIcon />
              </Icon>
              <ModalCreateModule module={module} isEdit />
            </AbsoluteCenter>
          </Box>
          <AccordionItemContent>
            <VStack
              borderWidth="1px solid"
              borderColor="neutral.40"
              p="20px"
              w="100%"
            >
              {moduleLessons[module._id]?.length ? (
                moduleLessons[module._id].map((lesson, index) => (
                  <VStack
                    borderWidth="1px solid"
                    borderColor="neutral.40"
                    w="100%"
                    key={lesson._id}
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
                          src={lesson.thumbnail ?? "/images/bg.png"}
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
                          {capitalizeFirstLetter(lesson.stateLesson)}
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
                          >
                            <MenuItem
                              cursor="pointer"
                              p={3}
                              color="neutral"
                              value="rename"
                              _hover={{ bg: "neutral.30" }}
                              onClick={() => {
                                navigate(`/infoproducts/create/video/${module._id}`, { state: { lesson } });
                              }}
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
                    {index < moduleLessons[module._id]?.length - 1 && (
                      <Divider width="100%" />
                    )}
                  </VStack>
                ))
              ) : (
                <VStack justify="center" w="100%" spaceY={2}>
                  <Text.Medium fontSize="16px">
                    Este módulo não possui aulas, deseja adicionar?
                  </Text.Medium>
                  <HStack gap={2} justify="center" mx="auto" w="100%">
                    <Btn
                      onClick={() => {
                        setModuleId(module._id);
                        navigate(`/infoproducts/create/platfoms/${module._id}`);
                      }}
                      w="20vw"
                      iconLeft={<HiPlus />}
                      label="Adicionar aulas via integração"
                    />
                    <Btn
                      onClick={() =>
                        navigate(`/infoproducts/create/video/${module._id}`)
                      }
                      w="20vw"
                      iconLeft={<HiPlus />}
                      label="Adicionar uma aula única"
                    />
                  </HStack>
                </VStack>
              )}
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default Accordeon;
