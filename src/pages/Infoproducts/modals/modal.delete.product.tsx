import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { Input, VStack } from "@chakra-ui/react";
import { deleteProduct } from "services/product.services";
import { useProducts } from "hooks/useProducts";
import Text from "components/text/text";
import Btn from "components/button/button";
import { toaster } from "components/ui/toaster";

interface DeleteProductModalProps {
  productId?: string | null;
  productName?: string | null;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  productId,
  productName,
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  const { refetchProducts } = useProducts();

  const { mutate: mutateDeleteProduct, isPending } = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      refetchProducts();
      toaster.create({
        title: "Infoproduto deletado com sucesso.",
        type: "error",
      });
    },
  });

  const handleDelete = () => {
    if (confirmationText === `Deletar ${productName}`) {
      mutateDeleteProduct();
    } else {
      toaster.create({
        title: "Texto digitado incorretamente.",
        type: "info",
      });
    }
  };

  return (
    <DialogRoot placement="center" role="alertdialog">
      <DialogTrigger asChild>
        <Text.Medium fontSize="14px">Excluir Produto</Text.Medium>
      </DialogTrigger>
      <DialogContent bg="neutral.60" p={4}>
        <DialogHeader>
          <DialogTitle color="neutral">Confirmação de Exclusão</DialogTitle>
        </DialogHeader>
        <DialogBody py={4}>
          <VStack align="flex-start" w="100%" spaceY={4}>
            <Text.Medium color="neutral" fontSize="14px">
              Você realmente deseja excluir o info produto{" "}
              <strong>{productName}</strong>? Esta ação não poderá ser desfeita
              e todos os dados associados serão removidos.
            </Text.Medium>
            <Text.Medium color="neutral" fontSize="16px">
              Digite abaixo <strong>"Deletar {productName}"</strong> para
              confirmar:
            </Text.Medium>
            <Input
              px={2}
              color="neutral"
              borderColor="neutral.20"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={`Deletar ${productName}`}
            />
          </VStack>
        </DialogBody>
        <DialogFooter w="100%" justifyContent="space-between">
          <DialogActionTrigger asChild>
            <Btn
              disabled={isPending}
              label="Cancelar"
              bg="transparent"
              w="200px"
            />
          </DialogActionTrigger>
          <Btn
            onClick={handleDelete}
            isLoading={isPending}
            label="Excluir"
            bg="error.20"
            bgHover="error.30"
            w="200px"
            disabled={
              confirmationText !== `Deletar ${productName}` || isPending
            }
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteProductModal;
