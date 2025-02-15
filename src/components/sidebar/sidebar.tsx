import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Flex, Link, Stack, Box, Icon, Center } from "@chakra-ui/react";
import { renderMenuItem } from "./sidebar.item";
import NexlyLogo from "assets/icons/NexlyLogo";
import IconNNexly from "assets/icons/NNexly";
import SidebarIconLeft from "assets/icons/ArrowBack";
import SidebarIconRight from "assets/icons/RightIcon";
import { menuItems } from "./items";
import Divider from "components/divider/divider";
import NotificationsDrawer from "components/notifications/drawer.notifications";
import ProfileDialog from "components/dialog/dialog.profile";
import { useAuth } from "hooks/useAuth";
import { useProducer } from "hooks/useProducer";
import { useEffect } from "react";
import useSidebar from "stores/sidebar.store";
import { useSidebarController } from "./sidebar.controler";

const Sidebar: React.FC = () => {
  const { signout } = useAuth();
  const isMobile = window.innerWidth <= 768;
  const { notifications } = useProducer();
  const {
    storedNotificationCount,
    setStoredNotificationCount,
    isOpen,
    toggleIsOpen,
  } = useSidebar();
  const {isOpenModal, toggleIsOpenModal} = useSidebarController();

  useEffect(() => {
    if (notifications?.length > storedNotificationCount) {
      localStorage.setItem(
        "notificationCount",
        storedNotificationCount.toString()
      );
    }
  }, [notifications, storedNotificationCount]);

  const handleNotificationsClick = () => {
    setStoredNotificationCount(notifications.length);
    localStorage.setItem("notificationCount", notifications.length.toString());
  };

  return (
    <>
      {!isOpen && isMobile && (
        <Icon
          aria-label="Toggle Sidebar"
          position="fixed"
          top="10px"
          left="10px"
          fontSize="24px"
          zIndex="1000"
          onClick={toggleIsOpen}
        >
          {isOpen ? <SidebarIconLeft /> : <SidebarIconRight />}
        </Icon>
      )}
      <Flex
        h="100vh"
        bg="neutral.60"
        pb={5}
        w={isOpen === false ? "80px" : "250px"}
        flexDirection="column"
        borderRight="1px solid"
        borderColor="neutral.40"
        transition="width 0.01s ease-in"
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
            <Box
              mx="auto"
              position="relative"
              onClick={handleNotificationsClick}
            >
              <NotificationsDrawer data={notifications} />
              {notifications?.length > storedNotificationCount && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="10px"
                  h="10px"
                  bg="purple.600"
                  borderRadius="50%"
                />
              )}
            </Box>
            <Center mx="auto" position="relative">
              <Icon
                w="90%"
                onClick={() => signout()}
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
          <ProfileDialog toggleIsOpenModal={toggleIsOpenModal} isOpenModal={isOpenModal} isOpen={isOpen} />
        </Stack>
      </Flex>
    </>
  );
};

export default Sidebar;
