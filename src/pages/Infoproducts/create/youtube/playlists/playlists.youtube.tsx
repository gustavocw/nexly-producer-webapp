import {
  VStack,
  HStack,
  Box,
  Text,
  Flex,
  Group,
} from "@chakra-ui/react";
import Btn from "components/button/button";
import SearchBar from "components/search/search";
import TitlePage from "components/titlePage/titlePage";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import { useNavigate } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/ui/pagination";

interface PlaylistData {
  id: string;
  title: string;
  videosCount: number;
  imageUrl: string;
}

const playlists: PlaylistData[] = [
  {
    id: "playlist-1",
    title: "Playlist exemplo 1",
    videosCount: 16,
    imageUrl: "/images/backgroundlayer.png",
  },
  {
    id: "playlist-2",
    title: "Playlist exemplo 2",
    videosCount: 12,
    imageUrl: "/images/backgroundlayer.png",
  },
];

const YoutubePlaylists = () => {
  const navigate = useNavigate();
  return (
    <VStack px={8} w="100%" align="flex-start" spaceY={8}>
      <TitlePage
        title="Selecione uma playlist para o módulo"
        description="Escolha a playlist do YouTube que deseja integrar a este módulo. A playlist selecionada será usada para organizar e hospedar as aulas do módulo."
      />
      <VStack align="flex-start" w="100%" spaceY={4}>
        <SearchBar placeholder="Pesquisar playlist" />
        <RadioCardRoot
          variant="outline"
          defaultValue={playlists[0].id}
          orientation="vertical"
        >
          <HStack align="stretch" spaceX={4}>
            {playlists.map((playlist) => (
              <RadioCardItem
                key={playlist.id}
                value={playlist.id}
                borderColor="transparent"
                cursor="pointer"
                _checked={{
                  bg: "neutral.60",
                  borderColor: "primary.50",
                }}
                label={
                  <Box
                    bgImage={`url(${playlist.imageUrl})`}
                    bgSize="cover"
                    bgPos="center"
                    bgRepeat="no-repeat"
                    w="320px"
                    h="180px"
                  >
                    <VStack
                      p={2}
                      w="100%"
                      bg="#00000080"
                      pos="absolute"
                      bottom={0}
                      align="flex-start"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize="16px"
                        color="neutral.10"
                      >
                        {playlist.title}
                      </Text>
                      <Text fontSize="14px" color="neutral.20">
                        {playlist.videosCount} vídeos
                      </Text>
                    </VStack>
                  </Box>
                }
              />
            ))}
          </HStack>
        </RadioCardRoot>
        <Flex
          alignItems="center"
          w="100%"
          justify="flex-end"
          bg="neutral.60"
          right={0}
          p={3}
          position="absolute"
          bottom={0}
          gap="20px"
        >
          <PaginationRoot
            count={10}
            pageSize={2}
            defaultPage={1}
            variant="solid"
          >
            <Group attached>
              <PaginationPrevTrigger borderColor="neutral.40" />
              <PaginationItems color="neutral" />
              <PaginationNextTrigger />
            </Group>
          </PaginationRoot>
          <Btn
            label="Continuar"
            w="200px"
            onClick={() => navigate("/infoproducts/create/youtube/videos")}
          />
        </Flex>
      </VStack>
    </VStack>
  );
};

export default YoutubePlaylists;
