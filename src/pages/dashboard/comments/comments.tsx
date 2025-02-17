import { HStack, Image, Link, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";
import { formatDateToString } from "utils/formatDateToString";

interface CommentProps {
  data: CommentData[];
}

const Comments: React.FC<CommentProps> = ({ data }) => {
  return (
    <VStack
      gap="20px"
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      w="100%"
      borderRadius="8px"
      padding="20px"
      align="flex-start"
    >
      <Text.Medium color="neutral" fontSize="18px">
        Comentários recentes
      </Text.Medium>
      <VStack overflowY="auto" maxH="400px" w="100%" gap="20px">
        {data?.length > 0 ? (
          data?.map((comment, index) => (
            <VStack key={comment._id} w="100%" gap="16px">
              <HStack gap="6px" justify="space-between" w="100%">
                <HStack>
                  <Avatar src={comment.userPhoto} />
                  <VStack w="100%" gap="6px" align="flex-start">
                    <Text.Medium fontSize="14px">
                      {comment.username} • {formatDateToString(comment.createdAt)}
                    </Text.Medium>
                    <Text.Medium fontSize="13px">{comment.comment}</Text.Medium>
                  </VStack>
                </HStack>
                <Image
                  src={comment.thumbnail}
                  borderRadius="8px"
                  w="100px"
                  h="50px"
                />
              </HStack>
              {index < data?.length - 1 && <Divider width="100%" />}
            </VStack>
          ))
        ) : (
          <Text.Medium fontSize="16px">Sem comentários recentes.</Text.Medium>
        )}
      </VStack>
      {data?.length > 1000 && (
        <VStack align="flex-start" w="100%">
          <Link
            color="primary.50"
            fontWeight="600"
            cursor="pointer"
            textDecoration="none"
            fontSize="14px"
          >
            Mostrar mais
          </Link>
        </VStack>
      )}
    </VStack>
  );
};

export default Comments;
