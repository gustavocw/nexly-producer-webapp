import { Flex, Heading } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import type React from "react";

interface ProfileDialog {
  isOpen: boolean;
}

const ProfileDialog: React.FC<ProfileDialog> = ({ isOpen }) => {
  return (
    <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger cursor="pointer" asChild>
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
      </DialogTrigger>
      <DialogContent bg="neutral.50" maxH="90%" maxW="90%">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileDialog;
