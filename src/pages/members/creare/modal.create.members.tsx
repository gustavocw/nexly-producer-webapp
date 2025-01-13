import { HStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { LuPlus } from "react-icons/lu";

const ModalCreateMember = () => {
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Btn w="200px" label="Adicionar membro" iconLeft={<LuPlus />} />
        </DialogTrigger>
        <DialogContent bg="neutral.60" p="12px">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Btn bg="transparent" label="Cancelar" w="100px" />
            </DialogActionTrigger>
            <Btn label="Adicionar" w="100px" />
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default ModalCreateMember;
