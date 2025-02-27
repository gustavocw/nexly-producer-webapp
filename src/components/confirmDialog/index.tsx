import { useQueryClient } from "@tanstack/react-query";
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
} from "components/ui/dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}: ConfirmDialogProps) => {
  const queryClient = useQueryClient();
  const isLoading = queryClient.isMutating({ mutationKey: ["deleteArea"] }) > 0;
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <DialogRoot placement="center" open={isOpen} onOpenChange={onClose}>
      <DialogContent bg="neutral.60" p={2} color="neutral">
        <DialogHeader>
          <DialogTitle>Confirmação</DialogTitle>
        </DialogHeader>
        <DialogBody py={5}>
          <p>{message}</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Btn
            w="200px"
            bg="transparent"
            bgHover="transparent"
            label="Cancelar"
            onClick={onClose}
            isLoading={isLoading}
          />
          </DialogActionTrigger>
          <Btn
            w="200px"
            label="Confirmar"
            onClick={handleConfirm}
            isLoading={isLoading}
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmDialog;
