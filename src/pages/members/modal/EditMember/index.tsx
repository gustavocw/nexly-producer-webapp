import { DialogCloseTrigger, Flex, Text, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import { Avatar } from "components/ui/avatar";
import FormProfile from "./formprofile/form";
import { useProfileController } from "./controller";
import { FileUploadRoot, FileUploadTrigger } from "components/ui/file-upload";
import { SkeletonCircle } from "components/ui/skeleton";
import { IoClose } from "react-icons/io5";
import Btn from "components/button/button";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "components/ui/dialog";
import React from "react";
import { Member } from "types/members";

const ModalEditUser: React.FC<{ member?: Member }> = ({ member }) => {
  const {
    controlProfile,
    handleProfileSubmit,
    onSubmitProfile,
    updatingProfile,
    setPhotoFile,
    photoFile,
  } = useProfileController(member);

  return (
    <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Text
          cursor="pointer"
          fontSize="14px"
          _hover={{ bg: "neutral.40" }}
          p={2}
          color="neutral"
        >
          Editar membro
        </Text>
      </DialogTrigger>
      <DialogContent zIndex={99999} w="60%" h="auto" py={4} bg="neutral.60">
        <VStack w="100%">
          <VStack align="flex-start" gap="32px" py={4} m="auto" w="90%">
            <DialogHeader w="100%">
              <Flex w="100%" justify="space-between">
                <Text fontSize="20px" color="neutral">
                  Editar dados do usuário {member?.name}
                </Text>
                <DialogCloseTrigger cursor="pointer" fontSize="24px">
                  <IoClose color="#fff" />
                </DialogCloseTrigger>
              </Flex>
            </DialogHeader>
            <Flex
              justify="center"
              flexDirection={{ base: "column", md: "row" }}
              gap="32px"
              alignItems={{ base: "center", md: "flex-start" }}
              width={{ base: "90%", md: "100%" }}
              mx={{ base: "auto", md: 0 }}
            >
              <FileUploadRoot
                onFileChange={(file) =>setPhotoFile(file.acceptedFiles[0])}
                w="100px"
                borderRadius="full"
              >
                <FileUploadTrigger borderRadius="full" cursor="pointer">
                  <SkeletonCircle loading={!member?.photo}>
                    <Avatar
                      src={photoFile?.name ? URL.createObjectURL(photoFile) : member?.photo}
                      mx={{ base: "auto", md: 0 }}
                      w="112px"
                      h="112px"
                    />
                  </SkeletonCircle>
                </FileUploadTrigger>
              </FileUploadRoot>
              <Input.Text name="bio" control={controlProfile} />
            </Flex>
            <FormProfile
              handle={handleProfileSubmit}
              onSubmit={onSubmitProfile}
              control={controlProfile}
            />
          </VStack>
          <Flex w="90%" justify="flex-end">
            <Btn
              w="200px"
              label="Salvar"
              onClick={() => handleProfileSubmit(onSubmitProfile)()}
              isLoading={updatingProfile}
            />
          </Flex>
        </VStack>
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalEditUser;
