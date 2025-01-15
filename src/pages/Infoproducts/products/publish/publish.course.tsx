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
  DialogTrigger,
} from "components/ui/dialog";
import { toaster } from "components/ui/toaster";
import { publishProduct } from "services/product.services";

const PublishProductModal: React.FC<{ idProduct?: string }> = ({
  idProduct,
}) => {
  const { mutate: mutatePublish } = useMutation({
    mutationFn: () => publishProduct(idProduct),
    onSuccess: () => {
      toaster.create({
        title: "Publicado com sucesso!",
        type: "success",
      });
      window.close();
    },
  });

  return (
    <DialogRoot placement="center" role="alertdialog">
      <DialogTrigger asChild>
        <Text.Medium fontSize="14px">Publicar curso</Text.Medium>
      </DialogTrigger>
      <DialogContent color="#fff" bg="neutral.60" p={4}>
        <DialogHeader>
          <DialogTitle>Deseja tornar público este info produto ?</DialogTitle>
        </DialogHeader>
        <DialogBody py={4}>
          <p>
            Todos os membros deste curso terão acesso a visualização do mesmo.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Btn w="200px" label="Cancelar" bg="transparent" />
          </DialogActionTrigger>
          <Btn w="200px" label="Confirmar" onClick={mutatePublish} />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default PublishProductModal;
