import { DialogDescription, Field, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Btn from "components/button/button";
import Text from "components/text/text";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "components/ui/dialog";
import { toaster } from "components/ui/toaster";
import { useState } from "react";
import { changePasswordMember } from "services/members.services";

const ModalChangePassword: React.FC<{
  idMember?: string;
  refetch: () => void;
  memberName?: string;
}> = ({ idMember, refetch, memberName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  const { mutate: mutateChange, isPending } = useMutation({
    mutationFn: () => changePasswordMember(idMember, password),
    onSuccess: () => {
      refetch();
      toaster.create({
        title: "Publicado com sucesso!",
        type: "success",
      });
      setIsOpen(false);
    },
  });

  return (
    <DialogRoot
      onOpenChange={(e) => setIsOpen(e.open)}
      open={isOpen}
      placement="center"
      role="alertdialog"
    >
      <Text.Medium
        p={2}
        _hover={{ bg: "neutral.40" }}
        cursor="pointer"
        onClick={() => setIsOpen(true)}
        fontSize="14px"
      >
        Alterar senha
      </Text.Medium>
      <DialogContent color="#fff" bg="neutral.60" p={4}>
        <DialogHeader>
          <DialogTitle>Deseja alterar a senha de {memberName} ?</DialogTitle>
          <DialogDescription>
            A senha será enviada para o email do usuário.
          </DialogDescription>
        </DialogHeader>
        <DialogBody py={4}>
          <Field.Root>
            <Field.Label>Nova senha</Field.Label>
            <Input
              value={password}
              onChange={(value) => setPassword(value.target.value)}
              px={2}
              placeholder="Digite a nova senha"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  mutateChange();
                }
              }}
            />
          </Field.Root>
        </DialogBody>
        <DialogFooter w="100%" justifyContent="center">
          <DialogActionTrigger asChild>
            <Btn w="50%" label="Cancelar" bg="transparent" />
          </DialogActionTrigger>
          <Btn
            w="50%"
            isLoading={isPending}
            label="Confirmar"
            onClick={mutateChange}
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalChangePassword;
