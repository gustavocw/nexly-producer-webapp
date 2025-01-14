import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent, DrawerHeader,
  DrawerRoot,
  DrawerTrigger
} from "components/ui/drawer";
import { Box, Flex, HStack, Icon, VStack } from "@chakra-ui/react";
import SearchBar from "components/search/search";
import { Avatar } from "components/ui/avatar";
import Text from "components/text/text";
import { formatDateToString } from "utils/formatDateToString";
import { truncateText } from "utils/truncateText";

interface NotificationsProps {
  data: Notification[];
}

const NotificationsDrawer: React.FC<NotificationsProps> = ({ data }) => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Icon
          w="90%"
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
      </DrawerTrigger>
      <DrawerContent bg="neutral.60">
        <DrawerHeader>
          <Flex w="100%" justify="center" h="120px">
            <SearchBar placeholder="Pesquisar notificações" />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {data.map((notification) => (
            <HStack
              key={notification._id}
              borderTopWidth="1px"
              borderBottomWidth="1px"
              borderColor="neutral.40"
              cursor="pointer"
              _hover={{ bg: "neutral.40" }}
              align="flex-start"
              p="20px"
              w="100%"
            >
              <Avatar src="/images/bg.png" />
              <VStack align="flex-start" w="100%">
                <Flex w="100%" alignItems="center" justify="space-between">
                  <Flex gap="5px" alignItems="center">
                    <Text.Medium>{notification.title}</Text.Medium>
                  </Flex>
                  <Box>
                    <Text.Medium fontSize="11px" color="primary.50">
                      {formatDateToString(notification.createdAt)}
                    </Text.Medium>
                  </Box>
                </Flex>
                <Flex justify="space-between" w="100%">
                  <Text.Medium color="neutral.10">{truncateText(notification.content, 60)}</Text.Medium>
                </Flex>
              </VStack>
            </HStack>
          ))}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NotificationsDrawer;
