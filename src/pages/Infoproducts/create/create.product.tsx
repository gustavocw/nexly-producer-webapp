import { HStack, Image, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import TitlePage from "components/titlePage/titlePage";
import useCreateProductController from "./create.products.controller";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "components/ui/file-upload";
import Text from "components/text/text";
import Select from "components/select/select";
import Btn from "components/button/button";

const CreateProduct = () => {
  const { control, errors, navigate, handleSubmit, onSubmit } =
    useCreateProductController();
  const options = [
    { value: "react", label: "React.js" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];
  return (
    <VStack w="100%" align="flex-start" px={8}>
      <TitlePage
        description="Principais informações do curso"
        title="Informações básicas"
      />
      <VStack gap="64px" ml={2} w="60%">
        <Input.Base
          name="title"
          control={control}
          label="Titulo do curso"
          placeholder="Insira o nome do curso"
          helperText="Esse será o titulo do curso exibido para os seus membros"
        />

        <Input.Text
          name="description"
          control={control}
          label="Descrição"
          placeholder="Insira a descrição do curso"
          helperText="Essa será a descrição do curso exibida para os seus membros"
          errorText={errors?.description?.message}
        />

        <FileUploadRoot gap={0} maxW="100%" alignItems="stretch" maxFiles={1}>
          <Text.Medium my="4px" fontSize="14px">
            Capa do curso
          </Text.Medium>
          <FileUploadDropzone
            cursor="pointer"
            bg="transparent"
            color="neutral"
            border="1px dashed"
            borderColor="neutral.30"
            _icon={{
              display: "none",
            }}
            label={
              <VStack>
                <Image src="/images/FileImage.svg" />
                <Text.Medium fontSize="13px" display="flex" gap={1}>
                  Arraste uma imagem ou{" "}
                  <a style={{ color: "#5E84F1", cursor: "pointer" }}>
                    selecione manualmente
                  </a>
                </Text.Medium>
                <FileUploadList w="100px" />
              </VStack>
            }
          />
          <Text.Medium my="4px" fontSize="12px">
            A imagem de capa deve estar no formato JPG ou PNG e tamanho máximo
            de 5 MB. Dimensões ideais: 1.500 x 1.000 pixels.
          </Text.Medium>
        </FileUploadRoot>

        <Select
          name="category"
          control={control}
          options={options}
          label="Categoria"
          placeholder="Escolha uma categoria"
          helperText="Categoria na qual o curso será classificado"
        />

        <Select
          name="area"
          control={control}
          label="Área"
          options={options}
          placeholder="Insira a área do curso"
          helperText="Defina a área de conhecimento do curso"
        />
      <HStack pb={10} w="100%">
        <Btn w="50%" label="Cancelar" bg="transparent" onClick={() => navigate("/infoproducts")} />
        <Btn w="50%" label="Salvar" onClick={handleSubmit(onSubmit)} />
      </HStack>
      </VStack>

    </VStack>
  );
};

export default CreateProduct;
