import {
  Table,
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Flex
} from "@chakra-ui/react";
import { Checkbox } from "components/ui/checkbox";
import { useState } from "react";

interface VideoItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface VideosTableProps {
  items: VideoItem[];
}

const VideosTable: React.FC<VideosTableProps> = ({ items }) => {
  const [selection, setSelection] = useState<string[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map((item) => (
    <Table.Row
      bg="neutral.50"
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
    >
      <Table.Cell borderColor="neutral.40">
        <Checkbox
          variant="solid"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : selection.filter((id) => id !== item.id)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell borderColor="neutral.40" p="20px">
        <HStack align="center" spaceX={4}>
          <Box w="80px" h="60px">
            <Image
              src={item.imageUrl}
              alt={item.name}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <VStack align="flex-start" spaceY={1}>
            <Text fontWeight="bold" fontSize="16px" color="neutral.10">
              {item.name}
            </Text>
            <Text fontSize="14px" color="neutral.20">
              {item.description}
            </Text>
          </VStack>
        </HStack>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row bg="neutral.50">
            <Table.ColumnHeader borderColor="neutral.40" w="10px">
              <Checkbox
                variant="solid"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? items.map((item) => item.id) : []
                  );
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader borderColor="neutral.40" color="neutral">
              <Flex px={3} alignItems="center" h="60px">
                <Text>Vídeos selecionados</Text>
              </Flex>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
      {/* 
      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot> */}
    </>
  );
};

export default VideosTable;
