import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import {
  Heading,
  Flex,
  Link,
  Stack,
  Box,
  Icon,
  Center,
} from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import { renderMenuItem } from "./sidebar.item";
import { useSidebarController } from "./sidebar.controler";
import NexlyLogo from "assets/icons/NexlyLogo";
import IconNNexly from "assets/icons/NNexly";
import SidebarIconLeft from "assets/icons/ArrowBack";
import SidebarIconRight from "assets/icons/RightIcon";
import { menuItems } from "./items";
import Divider from "components/divider/divider";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, toggleIsOpen } = useSidebarController();

  return (
    <Flex
      h="100vh"
      bg="neutral.60"
      pb={5}
      w={isOpen === false ? "80px" : "250px"}
      flexDirection="column"
      borderRight="1px solid"
      borderColor="neutral.40"
      transition="width 0.03s ease-in"
      justify="space-between"
    >
      <Box>
        <Flex
          direction="row"
          height="73px"
          justifyContent={isOpen ? "space-between" : "center"}
          w="95%"
        >
          <Link w={isOpen ? "100px" : "50%"} _hover={{}} _active={{}}>
            {isOpen ? <NexlyLogo /> : <IconNNexly />}
          </Link>
          <Link
            _hover={{}}
            _active={{}}
            alignSelf="center"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            onClick={toggleIsOpen}
            zIndex={99}
          >
            {isOpen ? (
              <SidebarIconLeft width="20px" />
            ) : (
              <SidebarIconRight width="20px" />
            )}
          </Link>
        </Flex>
        <Divider />
        <Flex
          flexDirection="column"
          width="100%"
          alignItems={isOpen === false ? "center" : "flex-start"}
          py={5}
          px={2}
          gap="20px"
        >
          {menuItems.map((item) => renderMenuItem(item, isOpen))}
        </Flex>
      </Box>

      <Stack
        direction="column"
        align="flex-end"
        w="95%"
        h="150px"
        px="8px"
        alignItems={isOpen === false ? "center" : "flex-start"}
      >
        <Flex
          mt="auto"
          gap={2}
          w={isOpen ? "40%" : "90%"}
          flexDir={isOpen ? "row" : "column"}
        >
          <Box mx="auto" position="relative">
            <Icon
              w="90%"
              as={NotificationsNoneRoundedIcon}
              // onClick={() => setShowNotifications(!showNotifications)}
              boxSize="35px"
              p="2"
              borderRadius={10}
              cursor="pointer"
              color="neutral.20"
              border="1px solid"
              borderColor="neutral.40"
            >
              <NotificationsNoneRoundedIcon />
            </Icon>
            {/* {hasNewNotifications && ( */}
            <Box
              position="absolute"
              top="0"
              left="0"
              w="10px"
              h="10px"
              bg={"purple.600"}
              borderRadius="50%"
            />
            {/* // )} */}
          </Box>
          <Center mx="auto" position="relative">
            <Icon
              w="90%"
              onClick={() => navigate("/login")}
              borderRadius={10}
              boxSize="35px"
              p="2"
              color="neutral.20"
              border="1px solid"
              borderColor="neutral.40"
              cursor="pointer"
              mx="2"
              mb="2"
            >
              <LoginRoundedIcon />
            </Icon>
          </Center>
        </Flex>
        <Flex
          mt="auto"
          p={4}
          direction="row"
          alignItems="center"
          justifyContent={isOpen ? "flex-start" : "center"}
          border="1px solid"
          borderColor="neutral.40"
          bg="neutral.50"
          borderRadius="18px"
          w="100%"
        >
          <Avatar size="sm" src="avatar-1.jpg" />
          {isOpen && (
            <Flex flexDir="column" ml={4}>
              <Heading color="primary" as="h3" size="sm">
                Sylwia Weller
              </Heading>
            </Flex>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Sidebar;
