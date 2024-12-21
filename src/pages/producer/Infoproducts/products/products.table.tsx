import { Stack, Table } from "@chakra-ui/react";
import type React from "react";
import type { Product } from "types/product";

interface Productes {
  data: Product[];
}

const ProductsTable: React.FC<Productes> = ({ data }) => {
  return (
    <Stack gap="10">
      <Table.Root size="sm">
        <Table.Header >
          <Table.Row borderTopLeftRadius="8px" h="60px" bg="neutral.60">
            <Table.ColumnHeader color="primary" fontSize="14px" border="none">
              Nome
            </Table.ColumnHeader>
            <Table.ColumnHeader color="primary" fontSize="14px" border="none">
              Categoria
            </Table.ColumnHeader>
            <Table.ColumnHeader color="primary" fontSize="14px" border="none">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader color="primary" fontSize="14px" border="none">
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default ProductsTable;
