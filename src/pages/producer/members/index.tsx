import { Stack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";

const Members = () => {
  const optionsNav = [
    { label: `Ativos ${2}`, value: "actives" },
    { label: `Bloqueados ${5}`, value: "blocked" },
  ];

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
  };
  return (
    <Stack gap="32px" px={8}>
      <NavOptions
        pt="10"
        defaultValue={optionsNav[0].value}
        options={optionsNav}
        onChange={handleSelectionChange}
      />
    </Stack>
  );
};

export default Members;
