import React from "react";
import {
  Table,
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Checkbox } from "components/ui/checkbox";
import { truncateText } from "utils/truncateText";

interface VideosTableVimeoProps {
  items?: any;
  selection: string[];
  setSelection: (selection: string[]) => void;
  onGenerateLessons: () => void;
  loading: boolean;
}

const VideosTableVimeo: React.FC<VideosTableVimeoProps> = ({
  items,
  selection,
  setSelection,
  loading,
}) => {
  const hasSelection = selection?.length > 0;
  const indeterminate = hasSelection && selection?.length < (items?.data?.length || 0);

  if (loading) {
    return <Spinner />;
  }

  if (!items?.data?.length) {
    return <Text>No videos available</Text>;
  }

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
                    changes.checked ? items.data.map((item: any) => item.video.uri) : []
                  );
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader pl={4} borderColor="neutral.40" color="neutral">
              Videos
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items?.data.map((item: any) => {
            const video = item.video;
            const isSelected = selection.includes(video.uri);

            return (
              <Table.Row
                bg="neutral.50"
                key={video.uri}
                data-selected={isSelected ? "" : undefined}
                onClick={() => {
                  setSelection(
                    isSelected
                      ? selection.filter((id) => id !== video.uri)
                      : [...selection, video.uri]
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell borderColor="neutral.40">
                  <Checkbox
                    variant="solid"
                    aria-label="Select row"
                    checked={isSelected}
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked
                          ? [...selection, video.uri]
                          : selection.filter((id) => id !== video.uri)
                      );
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Table.Cell>
                <Table.Cell borderColor="neutral.40" p="20px">
                  <HStack align="center" spaceX={4}>
                    <Box w="140px" h="100px">
                      <Image
                        src={video?.pictures?.sizes[0]?.link || ""}
                        alt={video?.name || "Video thumbnail"}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>
                    <VStack align="flex-start" spaceY={1}>
                      <Text fontWeight="bold" fontSize="16px" color="neutral.10">
                        {video?.name || "Untitled"}
                      </Text>
                      <Text fontSize="14px" color="neutral.20">
                        {truncateText(video?.description || "", 100)}
                      </Text>
                    </VStack>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default VideosTableVimeo;
