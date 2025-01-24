import { Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Text from "components/text/text";
import { toaster } from "components/ui/toaster";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUrlGoogle } from "services/google.services";
import useProductStore from "stores/product.store";

const AuthYoutube = () => {
  const [searchParams] = useSearchParams();
  const { productId } = useProductStore();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const { mutate: mutateAuth } = useMutation({
    mutationFn: () => setUrlGoogle(productId, code),
    onSuccess: (data) => {
      if (data?.success === true) {
        toaster.create({
          title: "Autenticado com sucesso!",
          type: "success",
        });
        setTimeout(() => {
          navigate("/infoproducts/create/youtube");
        }, 2000);
      }
    },
    onError: () => {
      toaster.create({
        title: "Erro ao autenticar!",
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (productId && code) {
      const delay = setTimeout(() => {
        mutateAuth();
      }, 2500);
      return () => clearTimeout(delay);
    }
  }, [productId, code, mutateAuth]);

  return (
    <VStack w="100%" h="100%" alignItems="center">
      <VStack h="100%" alignItems="center" justify="center">
        <Spinner color="primary.50" />
        <Text.Medium fontSize="20px">
          A integração está sendo feita e a página será redirecionada automaticamente.
        </Text.Medium>
        <Text.Small fontSize="16px">
          Aguarde.
        </Text.Small>
      </VStack>
    </VStack>
  );
};

export default AuthYoutube;
