import { HStack, Icon, VStack } from "@chakra-ui/react";
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
  DialogTrigger,
} from "components/ui/dialog";
import { LuPlus } from "react-icons/lu";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import { products } from "./products";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "hooks/useProducts";

export const ModalCategoryProduct: React.FC<{ isDisabled: boolean }> = ({
  isDisabled,
}) => {
  const [typeProduct, setTypeProduct] = useState("curso-em-video");
  const navigate = useNavigate();
  const { areas } = useProducts();

  return (
    <DialogRoot placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Btn
          w="200px"
          h="40px"
          label="Novo infoproduto"
          iconLeft={<LuPlus />}
          disabled={
            areas?.length === 0 || areas?.length === undefined || isDisabled
          }
        />
      </DialogTrigger>
      <DialogContent p="32px" bg="neutral.60" borderRadius="8px" gap="32px">
        <DialogHeader>
          <DialogTitle fontSize="24px" color="neutral" fontWeight="400">
            Adicionar novo infoproduto
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <RadioCardRoot defaultValue="curso-em-video">
            <VStack gap="20px" align="stretch">
              {products.map((item) => (
                <RadioCardItem
                  colorPalette="purple"
                  bg="neutral.60"
                  color="neutral"
                  p="10px"
                  gap="10px"
                  borderRadius="8px"
                  cursor="pointer"
                  divideColor="neutral.40"
                  border="1px solid"
                  disabled={item.value !== "curso-em-video"}
                  _disabled={{ color: "neutral.10" }}
                  borderColor="neutral.40"
                  label={item.title}
                  key={item.value}
                  value={item.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTypeProduct(e.target.value);
                  }}
                  addon={
                    <HStack my="10px">
                      <Icon fontSize="34px">
                        <item.icon />
                      </Icon>
                      {item.description}
                    </HStack>
                  }
                />
              ))}
            </VStack>
          </RadioCardRoot>
        </DialogBody>
        <DialogFooter w="100%">
          <DialogActionTrigger asChild>
            <Btn w="50%" label="Cancel" bg="transparent" />
          </DialogActionTrigger>
          <Btn
            w="50%"
            label="Continuar"
            onClick={() =>
              navigate("/infoproducts/create", {
                state: { type: typeProduct },
              })
            }
          />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
