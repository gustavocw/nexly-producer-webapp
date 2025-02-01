import { DialogDescription, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Input from "components/input/input";
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
import useCreateModuleController from "./modal.member.controller";
import Select from "components/select/select";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "hooks/useProducts";

const ModalCreateMember: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {products: productsAll} = useProducts();
  const { id } = useParams();
  const {
    control,
    errors,
    productList,
    handleSelectProduct,
    handleSubmit,
    onSubmit,
    creatingMember,
  } = useCreateModuleController({ refetch, onClose: () => setIsOpen(false) }); 
  const products = createListCollection({
    items: productList || [],
  });
    
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        placement="center"
        motionPreset="slide-in-bottom"
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
      >
        <DialogTrigger asChild>
          <Btn disabled={productsAll?.length === 0} w="200px" label="Adicionar membro" iconLeft={<LuPlus />} />
        </DialogTrigger>
        <DialogContent padding={4} bg="neutral.60" p="12px">
          <DialogHeader pb={8}>
            <DialogTitle color="neutral">Adicionar novo membro</DialogTitle>
            <DialogDescription color="neutral">
              Adicione um novo membro de forma manual
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <VStack gap="32px" w="100%">
              <Input.Base
                name="name"
                control={control}
                label="Nome do membro"
                placeholder="Insira o nome"
                errorText={errors?.name?.message}
              />
              <Input.Base
                name="email"
                control={control}
                label="E-mail"
                placeholder="Ex: exemplo@dominio.com"
                errorText={errors?.email?.message}
              />
              <Select
                name="state"
                control={control}
                options={[
                  { label: "Ativo", value: "ATIVO" },
                  { label: "Bloqueado", value: "BLOQUEADO" },
                  { label: "Colaborador", value: "COLABORADOR" },
                ]}
                label="Status"
                placeholder="Escolha o status "
              />
              {!id && (
                <SelectRoot
                  onValueChange={(e) => handleSelectProduct(e.value[0])}
                  w="100%"
                  collection={products}
                  size="sm"
                >
                  <SelectLabel color="neutral">Selecione o produto</SelectLabel>
                  <SelectTrigger color="neutral">
                    <SelectValueText mx={2} placeholder="Escolha um produto" />
                  </SelectTrigger>
                  <SelectContent
                    bg="neutral.60"
                    border="1px solid"
                    borderColor="neutral.40"
                    px={2}
                    py={2}
                    color="neutral"
                    w="100%"
                    zIndex={1000000}
                  >
                    {products.items.map((product: any) => (
                      <SelectItem
                        item={product}
                        key={product.value}
                        onSelect={() => handleSelectProduct(product.value)}
                      >
                        {product.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            </VStack>
          </DialogBody>
          <DialogFooter py={4}>
              <DialogActionTrigger asChild>
                <Btn bg="transparent" label="Cancelar" w="100px" />
              </DialogActionTrigger>
            <Btn isLoading={creatingMember} onClick={handleSubmit(onSubmit)} label="Adicionar" w="100px" />
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default ModalCreateMember;
