import { Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Text from "components/text/text";
import { toaster } from "components/ui/toaster";
import { useSearchParams } from "react-router-dom";
import { setUrlGoogle } from "services/google.services";
import useProductStore from "stores/product.store";

const AuthYoutube = () => {
  const [searchParams] = useSearchParams();
  const { productId } = useProductStore();
  const code = searchParams.get("code");

  const { mutate: mutateAuth } = useMutation({
    mutationFn: () => setUrlGoogle(productId, code),
    onSuccess: (data) => {
      console.log(data);
      
      toaster.create({
        title: "Autenticado com sucesso!",
        type: "success",
      });
      window.close();
    },
  });

  useEffect(() => {
    if (productId && code) {
      console.log("a", productId, code);
      
      mutateAuth();
    }
  }, [productId, code, mutateAuth]);

  return (
    <VStack w="100%" h="100%" alignItems="center">
      <VStack h="100%" alignItems="center" justify="center">
        <Spinner color="primary.50" />
        <Text.Medium fontSize="20px">
          A integração está sendo feita e a página será fechada automaticamente.
        </Text.Medium>
        <Text.Small fontSize="16px">
          Se a janela não fechar automaticamente, você pode fechá-la.
        </Text.Small>
      </VStack>
    </VStack>
  );
};

export default AuthYoutube;
