import { HStack, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import TitlePage from "components/titlePage/titlePage";
import useCreateProductController from "./create.products.controller";
import Select from "components/select/select";
import Btn from "components/button/button";
import { DragFile } from "components/fileInput/drag.file";

const CreateProduct = () => {
  const {
    control,
    product,
    file,
    errors,
    navigate,
    handleSubmit,
    onSubmit,
    updateFile,
    areaList,
  } = useCreateProductController();

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
          name="name"
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

        <DragFile
          onFileSelect={(file) => updateFile(file)}
          width="100%"
          label="Capa do curso"
          value={file}
        />

        <Select
          name="category"
          control={control}
          options={options}
          label="Categoria"
          placeholder="Escolha uma categoria"
          helperText="Categoria na qual o curso será classificado"
        />
        {!product && (
          <Select
            name="areaId"
            control={control}
            label="Área"
            options={areaList}
            placeholder="Insira a área do curso"
            helperText="Defina a área de conhecimento do curso"
          />
        )}
        <HStack pb={10} w="100%">
          <Btn
            w="50%"
            label="Cancelar"
            bg="transparent"
            onClick={() => navigate("/infoproducts")}
          />
          <Btn w="50%" label="Salvar" onClick={handleSubmit(onSubmit)} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CreateProduct;
