import { Flex, Heading, Tabs, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
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
import ProfileForm from "./form/form.profile";
import Plans from "./plans/plans";
import useProducerStore from "stores/producer.store";

interface ProfileDialog {
  isOpen: boolean;
}

const ProfileDialog: React.FC<ProfileDialog> = ({ isOpen }) => {
  const { producer } = useProducerStore();

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
                {producer?.name} {producer?.lastname}
              </Heading>
            </Flex>
          )}
        </Flex>
      </DialogTrigger>
      <DialogContent bg="neutral.60" h="95%" w="60%">
        <DialogHeader py="24px" px="32px" h="70px">
          <DialogTitle color="neutral" fontSize="22px">
            Configurações
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody overflowY="auto" h="calc(100% - 70px)" p={0}>
          <Tabs.Root variant="subtle" defaultValue="profile" h="100%">
            <Flex w="100%" h="100%">
              <VStack
                bg="neutral.60"
                h="100%"
                w="25%"
                align="flex-start"
                py={4}
                spaceY={4}
              >
                <Tabs.Trigger
                  _selected={{
                    bg: "#3A0C554D",
                    borderRightWidth: "2px",
                    borderRightColor: "primary.60",
                  }}
                  value="profile"
                  h="50px"
                  w="100%"
                >
                  <Flex w="100%" px={4} align="center">
                    <Text.Medium fontSize="14px" color="neutral">
                      Perfil
                    </Text.Medium>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger
                  _selected={{
                    bg: "#3A0C554D",
                    borderRightWidth: "2px",
                    borderRightColor: "primary.60",
                  }}
                  value="plans"
                  h="50px"
                  w="100%"
                >
                  <Flex w="100%" px={4} align="center">
                    <Text.Medium fontSize="14px" color="neutral">
                      Plano e cobranças
                    </Text.Medium>
                  </Flex>
                </Tabs.Trigger>
              </VStack>
              <VStack
                w="75%"
                bg="neutral.50"
                align="flex-start"
                spaceY={4}
                p={4}
                h="100%"
              >
                <Tabs.Content value="profile" w="100%" h="100%">
                  <ProfileForm />
                </Tabs.Content>
                <Tabs.Content value="plans" w="100%" h="100%">
                  <Plans />
                </Tabs.Content>
              </VStack>
            </Flex>
          </Tabs.Root>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileDialog;
