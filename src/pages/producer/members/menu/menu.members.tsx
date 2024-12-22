import React from "react";
import { MenuItem } from "@chakra-ui/react";

interface MenuItemsProps {
  onAction: (action: string) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onAction }) => {
  return (
    <>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        onClick={() => onAction("export")}
        borderRadius={0}
      >
        Exportar Lista Atual
      </MenuItem>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        p={2}
        color="neutral"
        borderRadius={0}
        onClick={() => onAction("import")}
      >
        Importar Lista
      </MenuItem>
      <MenuItem
        value=""
        _hover={{ bg: "neutral.40" }}
        bg="neutral.50"
        cursor="pointer"
        borderRadius={0}
        p={2}
        color="neutral"
        onClick={() => onAction("bulkDelete")}
      >
        Excluir em Massa
      </MenuItem>
    </>
  );
};

export default MenuItems;
