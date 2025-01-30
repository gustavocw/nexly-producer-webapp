import { HStack, Image, Link, VStack, Box } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import type React from "react";
import { formatDateToString } from "utils/formatDateToString";
import { truncateText } from "utils/truncateText";

interface Post {
  _id: string;
  name: string;
  duration: string;
  createdAt: string;
  thumbnail: string;
}

interface LastPostProps {
  posts: Post[];
}

const LastPost: React.FC<LastPostProps> = ({ posts }) => {
  return (
    <VStack
      borderRadius="8px"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="flex-start"
      width="80%"
      mx={4}
      overflow="auto"
      maxH="300px"
      bg="neutral.60"
      p="20px"
      alignItems="flex-start"
      gap="20px"
    >
      {posts?.length === 0 || !posts ? (
        posts?.map((post) =>
          post.name && post.thumbnail ? (
            <HStack key={post._id} gap="16px" w="100%">
              <Image w="120px" h="80px" borderRadius="8px" src={post.thumbnail} />
              <VStack alignItems="flex-start">
                <Text.Medium fontSize="14px">{truncateText(post.name, 5)}</Text.Medium>
                <Text.Medium fontSize="14px">{post.duration}</Text.Medium>
                <Text.Medium fontSize="14px">{formatDateToString(post.createdAt)}</Text.Medium>
              </VStack>
            </HStack>
          ) : null
        )
      ) : (
        <Box w="100%">
          <Text.Medium fontSize="16px">Nenhum post recente.</Text.Medium>
        </Box>
      )}
      {posts?.length > 0 && (
        <>
          <Divider width="100%" />
          <VStack justify="center" w="100%">
            <Link
              color="primary.50"
              fontWeight="600"
              cursor="pointer"
              textDecoration="none"
              fontSize="13px"
            >
              Analisar estatísticas
            </Link>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default LastPost;
