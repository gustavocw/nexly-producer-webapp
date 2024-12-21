import { HStack, Image, Link, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";

interface Comment {
  id: number;
  user: string;
  time: string;
  content: string;
  image: string;
}

const Comments = () => {
  const comments: Comment[] = [
    {
      id: 1,
      user: "Jessyca",
      time: "Há 20h",
      content: "Comentário exemplo comentário exemplo comentário exemplo...",
      image: "/images/thumb.png",
    },
    {
      id: 2,
      user: "Marcos",
      time: "Há 15h",
      content: "Outro comentário interessante para o exemplo...",
      image: "/images/thumb.png",
    },
    {
      id: 3,
      user: "Ana",
      time: "Há 10h",
      content: "Mais um comentário para ilustrar o layout...",
      image: "/images/thumb.png",
    },
  ];

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
      <VStack w="100%" gap="20px">
        {comments.map((comment, index) => (
          <VStack key={comment.id} w="100%" gap="16px">
            <HStack gap="6px" justify="space-between" w="100%">
              <HStack>
                <Avatar />
                <VStack w="100%" gap="6px" align="flex-start">
                  <Text.Medium fontSize="14px">
                    {comment.user} • {comment.time}
                  </Text.Medium>
                  <Text.Medium fontSize="13px">{comment.content}</Text.Medium>
                </VStack>
              </HStack>
              <Image
                src={comment.image}
                borderRadius="8px"
                w="100px"
                h="50px"
              />
            </HStack>
            {index < comments.length - 1 && <Divider width="100%" />}
          </VStack>
        ))}
      </VStack>
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
    </VStack>
  );
};

export default Comments;
