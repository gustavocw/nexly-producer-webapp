import { Text, Link, VStack } from "@chakra-ui/react";
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
} from "components/ui/dialog";
import Input from "components/input/input";
import { useMutation } from "@tanstack/react-query";
import { integrateHotmart } from "services/integrations.services";
import { useForm, Control, useWatch } from "react-hook-form";
import Btn from "components/button/button";
import { toaster } from "components/ui/toaster";

interface IntegrationFormData {
  CLIENT_ID_HOTMART: string;
  CLIENT_SECRET_HOTMART: string;
  BASIC_HOTMART: string;
}

interface ModalHotmartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalHotmart: React.FC<ModalHotmartProps> = ({ isOpen, onClose }) => {
  const { control, handleSubmit } = useForm<IntegrationFormData>({
    defaultValues: {
      CLIENT_ID_HOTMART: "",
      CLIENT_SECRET_HOTMART: "",
      BASIC_HOTMART: "",
    },
  });

  const formValues = useWatch({ control });
  const isFormFilled =
    formValues.CLIENT_ID_HOTMART &&
    formValues.CLIENT_SECRET_HOTMART &&
    formValues.BASIC_HOTMART;

  const { mutate: mutateHotmart, isPending } = useMutation({
    mutationFn: (params: IntegrationFormData) => integrateHotmart(params),
    onSuccess: () => {
      toaster.create({
        title: "Integração realizada com sucesso!",
        type: "success",
      });
      onClose();
    },
    onError: () => {
      toaster.create({
        title: "Erro ao integrar com a Hotmart.",
        type: "error",
      });
    },
  });

  const onSubmit = (data: IntegrationFormData) => {
    const payload = {
        ...data,
        provider: "hotmart"
    }
    mutateHotmart(payload);
  };

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      onOpenChange={(state) => state.open}
    >
      <DialogContent p={4} bg="neutral.60">
        <DialogHeader>
          <DialogTitle color="neutral">Integração com a Hotmart</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text color="neutral">
            Adicione suas credenciais da Hotmart abaixo, obtidas na área de
            desenvolvedor. Tem dúvidas? Clique no link abaixo:
          </Text>
          <VStack align="flex-start" spaceY={4}>
            <Link my={3} color="primary.50">
              Como integrar com a Nexly Hotmart?
            </Link>
            <Input.Base
              name="CLIENT_ID_HOTMART"
              control={control as unknown as Control<any>}
              label="Client ID"
              placeholder=""
            />
            <Input.Base
              name="CLIENT_SECRET_HOTMART"
              control={control as unknown as Control<any>}
              label="Client Secret"
              placeholder=""
            />
            <Input.Base
              name="BASIC_HOTMART"
              control={control as unknown as Control<any>}
              label="Basic Auth"
              placeholder=""
            />
          </VStack>
        </DialogBody>
        <DialogFooter py={4}>
          <Btn
            w="200px"
            bg="transparent"
            label="Cancelar"
            onClick={() => onClose()}
          />
          <Btn
            w="200px"
            label="Integrar"
            onClick={handleSubmit(onSubmit)}
            isLoading={isPending}
            disabled={!isFormFilled || isPending}
          />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalHotmart;
