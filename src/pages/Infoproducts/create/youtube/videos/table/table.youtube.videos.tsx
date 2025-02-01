import { Table, Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { Checkbox } from "components/ui/checkbox";
import { truncateText } from "utils/truncateText";

interface VideosTableProps {
  items?: PlaylistItem[] | null;
  selection: string[];
  setSelection: (selection: string[]) => void;
  onGenerateLessons: () => void;
}

const VideosTable: React.FC<VideosTableProps> = ({
  items,
  selection,
  setSelection,
}) => {
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < (items?.length || 0);

  const rows = items?.map((item) => {
    const isSelected = selection.includes(item.id);
  
    return (
      <Table.Row
        bg="neutral.50"
        key={item.id}
        data-selected={isSelected ? "" : undefined}
        onClick={() => {
          setSelection(
            isSelected
              ? selection.filter((id) => id !== item.id)
              : [...selection, item.id]
          );
        }}
        style={{ cursor: "pointer" }} // Adiciona um indicador visual de clicável
      >
        <Table.Cell borderColor="neutral.40">
          <Checkbox
            variant="solid"
            aria-label="Select row"
            checked={isSelected}
            onCheckedChange={(changes) => {
              setSelection(
                changes.checked
                  ? [...selection, item.id]
                  : selection.filter((id) => id !== item.id)
              );
            }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique no checkbox dispare o evento de clique da linha
          />
        </Table.Cell>
        <Table.Cell borderColor="neutral.40" p="20px">
          <HStack align="center" spaceX={4}>
            <Box w="140px" h="100px">
              <Image
                src={item?.snippet?.thumbnails?.high?.url}
                alt={item?.snippet?.title}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>
            <VStack align="flex-start" spaceY={1}>
              <Text fontWeight="bold" fontSize="16px" color="neutral.10">
                {item.snippet.title}
              </Text>
              <Text fontSize="14px" color="neutral.20">
                {truncateText(item.snippet.description, 100)}
              </Text>
            </VStack>
          </HStack>
        </Table.Cell>
      </Table.Row>
    );
  });
  
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row bg="neutral.50">
            <Table.ColumnHeader borderColor="neutral.40" w="30px">
              <Checkbox
                variant="solid"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? items?.map((item) => item.id) || [] : []
                  );
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader pl={4} borderColor="neutral.40" color="neutral">
              Vídeos
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
};

export default VideosTable;
