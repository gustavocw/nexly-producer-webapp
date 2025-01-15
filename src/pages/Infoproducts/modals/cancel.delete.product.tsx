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
import { cancelDeletion } from "services/product.services";
import { useProducts } from "hooks/useProducts";
import Text from "components/text/text";
import Btn from "components/button/button";
import { toaster } from "components/ui/toaster";

interface CancelDeleteProductModalProps {
  productId?: string | null;
  productName?: string | null;
}

const CancelDeleteProductModal: React.FC<CancelDeleteProductModalProps> = ({
  productId,
  productName,
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  const { refetchProducts } = useProducts();

  const { mutate: mutateCancelDeletion, isPending } = useMutation({
    mutationFn: () => cancelDeletion(productId),
    onSuccess: () => {
      toaster.create({
        title: "Exclusão do infoproduto cancelada com sucesso.",
        type: "success",
      });
      refetchProducts();
    },
    onError: () => {
      toaster.create({
        title: "Erro ao cancelar a exclusão do infoproduto.",
        type: "error",
      });
    },
  });

  const handleCancelDeletion = () => {
    if (confirmationText === `Reativar ${productName}`) {
      mutateCancelDeletion();
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
        <Text.Medium color="success.90" cursor="pointer" fontSize="14px">Cancelar Exclusão</Text.Medium>
      </DialogTrigger>
      <DialogContent bg="neutral.60" p={4}>
        <DialogHeader>
          <DialogTitle color="neutral">
            Confirmação de Cancelamento de Exclusão
          </DialogTitle>
        </DialogHeader>
        <DialogBody py={4}>
          <VStack align="flex-start" w="100%" spaceY={4}>
            <Text.Medium color="neutral" fontSize="14px">
              Você realmente deseja cancelar a exclusão do info produto{" "}
              <strong>{productName}</strong>? Isso fará com que o infoproduto
              seja restaurado e disponível novamente no sistema.
            </Text.Medium>
            <Text.Medium color="neutral" fontSize="16px">
              Digite abaixo <strong>"Reativar {productName}"</strong> para
              confirmar:
            </Text.Medium>
            <Input
              px={2}
              color="neutral"
              borderColor="neutral.20"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={`Reativar ${productName}`}
            />
          </VStack>
        </DialogBody>
        <DialogFooter w="100%" justifyContent="space-between">
          <DialogActionTrigger asChild>
            <Btn
              disabled={isPending}
              label="Voltar"
              bg="transparent"
              w="200px"
            />
          </DialogActionTrigger>
          <Btn
            onClick={handleCancelDeletion}
            isLoading={isPending}
            label="Cancelar Exclusão"
            w="200px"
            disabled={
              confirmationText !== `Reativar ${productName}` || isPending
            }
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CancelDeleteProductModal;
