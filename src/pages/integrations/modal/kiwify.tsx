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
import { integrateKiwify } from "services/integrations.services";
import { useForm, Control, useWatch } from "react-hook-form";
import Btn from "components/button/button";
import { toaster } from "components/ui/toaster";
import { queryClient } from "config/queryClient";

interface IntegrationFormData {
  client_id: string;
  client_secret: string;
  account_id: string;
}

interface ModalKiwifyProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalKiwify: React.FC<ModalKiwifyProps> = ({ isOpen, onClose }) => {
  const { control, handleSubmit } = useForm<IntegrationFormData>({
    defaultValues: {
      client_id: "3e32f566-b186-4a50-abcd-04b911640029",
      client_secret: "3bc421cd9664dd69fcdca3f9e163848ecccaca981921b07b57a1974174e15704",
      account_id: "xP70HKKwCuRTDmq",
    },
  });

  const formValues = useWatch({ control });
  const isFormFilled =
    formValues.client_id &&
    formValues.client_secret &&
    formValues.account_id;

  const { mutate: mutateKiwify, isPending } = useMutation({
    mutationFn: (params: IntegrationFormData) => integrateKiwify(params),
    onSuccess: (data) => {
      console.log(data)
      toaster.create({
        title: "Integração realizada com sucesso!",
        type: "success",
      });
      onClose();
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
    onError: (error: any) => {
      toaster.create({
        title: `Erro ao integrar com a Kiwify. ${error.response?.data?.message || "Erro desconhecido"}`,
        type: "error",
      });
    },
  });

  const onSubmit = (data: IntegrationFormData) => {
    mutateKiwify(data);
  };

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      onOpenChange={(state) => state.open}
    >
      <DialogContent p={4} bg="neutral.60">
        <DialogHeader>
          <DialogTitle color="neutral">Integração com a Kiwify</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text color="neutral">
            Adicione suas credenciais da Kiwify abaixo, obtidas na área de
            desenvolvedor. Tem dúvidas? Clique no link abaixo:
          </Text>
          <VStack align="flex-start" spaceY={4}>
            <Link my={3} color="primary.50">
              Como integrar com a Kiwify?
            </Link>
            <Input.Base
              name="client_id"
              control={control as unknown as Control<any>}
              label="Client ID"
              placeholder=""
            />
            <Input.Base
              name="client_secret"
              control={control as unknown as Control<any>}
              label="Client Secret"
              placeholder=""
            />
            <Input.Base
              name="account_id"
              control={control as unknown as Control<any>}
              label="Account ID"
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

export default ModalKiwify;