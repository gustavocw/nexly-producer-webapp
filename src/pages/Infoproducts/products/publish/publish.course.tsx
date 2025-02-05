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
import { publishProduct } from "services/product.services";

const PublishProductModal: React.FC<{ idProduct?: string }> = ({
  idProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: mutatePublish, isPending } = useMutation({
    mutationFn: () => publishProduct(idProduct),
    onSuccess: () => {
      toaster.create({
        title: "Publicado com sucesso!",
        type: "success",
      });
      setIsOpen(false);
    },
  });

  return (
    <DialogRoot onOpenChange={(e) => setIsOpen(e.open)} open={isOpen} placement="center" role="alertdialog">
      <Text.Medium onClick={() => setIsOpen(true)} fontSize="14px">
        Publicar curso
      </Text.Medium>
      <DialogContent color="#fff" bg="neutral.60" p={4}>
        <DialogHeader>
          <DialogTitle>Deseja tornar público este info produto ?</DialogTitle>
        </DialogHeader>
        <DialogBody py={4}>
          <p>
            Todos os membros deste curso terão acesso a visualização do mesmo.
          </p>
        </DialogBody>
        <DialogFooter w="100%" justifyContent="center">
          <DialogActionTrigger asChild>
            <Btn w="50%" label="Cancelar" bg="transparent" />
          </DialogActionTrigger>
          <Btn
            w="50%"
            isLoading={isPending}
            label="Confirmar"
            onClick={mutatePublish}
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default PublishProductModal;
