import {
  HStack,
  Text, VStack,
  Box,
  Input
} from "@chakra-ui/react";
import Btn from "components/button/button";
import { ClipboardIconButton, ClipboardRoot } from "components/ui/clipboard";
import {
  DialogBody, DialogContent, DialogHeader,
  DialogRoot, DialogTrigger
} from "components/ui/dialog";
import { useProducts } from "hooks/useProducts";
import { LuPlus } from "react-icons/lu";
import useProductStore from "stores/product.store";


const ModalWebhookHotmart = () => {
  const { productId } = useProductStore();
  const { products: productsAll } = useProducts();

  return (
    <DialogRoot placement="center">
      <DialogBody m="auto">
        <DialogTrigger asChild>
        <Btn
            disabled={productsAll?.length === 0}
            w="200px"
            label="Integrar Webhook"
            iconLeft={<LuPlus />}
          />
        </DialogTrigger>
        <DialogContent p="4" color="neutral" bg="neutral.60">
        <DialogHeader fontSize="16px">Integração com a Hotmart</DialogHeader>
          <VStack justify="flex-start" spaceY={5}>
            <Text  my={2} textAlign="start">
              Para adicionar a integração, copie a URL abaixo e adicione na
              Hotmart na aba Webhook.
            </Text>
            <Box w="100%">
              <Text color="white.100" textAlign="start">
                Copie essa url e cadastre na hotmart na aba de weboohk:
              </Text>
            </Box>
            <HStack align="center" w="100%">
              <Input
                px={2}
                color="neutral"
                placeholder="URL de webhook da hotmart"
                readOnly
                value={`https://app.hotmart.com/tools/webhook`}
              />
              <ClipboardRoot value={`https://app.hotmart.com/tools/webhook`}>
                <ClipboardIconButton />
              </ClipboardRoot>
            </HStack>
            <HStack align="center" w="100%" spaceX={1}>
              <Input
                px={2}
                color="neutral"
                placeholder="Copie e cole na hotmart"
                readOnly
                value={`https://optimumsistemas.dev.br/create/member/hotmart/${productId}`}
              />
              <ClipboardRoot
                value={`https://optimumsistemas.dev.br/create/member/hotmart/${productId}`}
              >
                <ClipboardIconButton />
              </ClipboardRoot>
            </HStack>
          </VStack>
        </DialogContent>
      </DialogBody>
    </DialogRoot>
  );
};

export default ModalWebhookHotmart;
