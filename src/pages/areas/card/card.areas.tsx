import { FC, useState } from "react";
import { Box, Text, Flex, Image, Skeleton } from "@chakra-ui/react";

export interface AreaCardProps {
  data: Area;
}

const AreaCard: FC<AreaCardProps> = ({ data }) => {
  const { title, domain, background, color, logo, icon } = data;

  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const isYouTube = background.includes("youtube.com") || background.includes("youtu.be");
  const isVimeo = background.includes("vimeo.com");
  const isVideo = isYouTube || isVimeo;
  const isImage = background.includes("cdn.nexly");

  const videoUrl = isYouTube
    ? background.replace("watch?v=", "embed/") + "?autoplay=1&mute=1&loop=1&playlist=" + background.split("v=")[1] + "&controls=0&disablekb=1&modestbranding=1&showinfo=0"
    : isVimeo
    ? background.replace("vimeo.com", "player.vimeo.com/video") + "?autoplay=1&muted=1&loop=1&background=1"
    : "";

  return (
      <Skeleton loading={!backgroundLoaded && isImage} w="100%" maxW="332px" h="200px" borderRadius="lg">
        <Box
          w="100%"
          maxW="332px"
          h="200px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          borderWidth="1px"
          borderColor="neutral.40"
          cursor="pointer"
          transition="0.3s"
          _hover={{
            borderColor: "primary.50",
          }}
          bg={!isVideo ? `url(${background})` : "transparent"}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        >
          {/* Se for um vídeo, exibe o <iframe> sem interação */}
          {isVideo && (
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              overflow="hidden"
            >
              <iframe
                src={videoUrl}
                width="110%"
                height="100%"
                style={{ position: "absolute", top: 0, left: -25, pointerEvents: "none" }}
              />
            </Box>
          )}

          {/* Se for uma imagem, carrega normalmente */}
          <Image
            src={background}
            display="none"
            onLoad={() => setBackgroundLoaded(true)}
          />

          <Flex position="absolute" top="0" w="100%" p="12px" gap={2}>
            <Skeleton loading={!iconLoaded} w="30px" h="30px" borderRadius="full">
              <Image
                w="30px"
                h="30px"
                src={icon}
                onLoad={() => setIconLoaded(true)}
              />
            </Skeleton>
            <Skeleton loading={!logoLoaded} w="30px" h="30px" borderRadius="full">
              <Image
                w="30px"
                h="30px"
                src={logo}
                onLoad={() => setLogoLoaded(true)}
              />
            </Skeleton>
          </Flex>
          <Flex
            position="absolute"
            bottom="0"
            w="100%"
            bg="rgba(0, 0, 0, 0.7)"
            p="12px"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="16px" fontWeight="600" color="white">
                {title}
              </Text>
              <Text fontSize="12px" color="white" opacity="0.8">
                {domain}
              </Text>
            </Box>
            <Box borderRadius="8px" w="40px" h="40px" bg={color} />
          </Flex>
        </Box>
      </Skeleton>
  );
};

export default AreaCard;
