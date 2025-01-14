import {
  VStack,
  Box,
  Text,
  Flex,
  Group,
} from "@chakra-ui/react";
import Btn from "components/button/button";
import SearchBar from "components/search/search";
import TitlePage from "components/titlePage/titlePage";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "components/ui/pagination";
import usePlaylistsController from "./playlist.youtube.controller";

const YoutubePlaylists = () => {
  const { playlists, onIntegrate, setPlaylist } = usePlaylistsController();

  return (
    <VStack px={8} w="100%" align="flex-start" spaceY={8}>
      <TitlePage
        title="Selecione uma playlist para o módulo"
        description="Escolha a playlist do YouTube que deseja integrar a este módulo. A playlist selecionada será usada para organizar e hospedar as aulas do módulo."
      />
      <VStack align="flex-start" w="100%" spaceY={4}>
        <SearchBar placeholder="Pesquisar playlist" />
        <RadioCardRoot variant="outline" orientation="vertical">
          <Flex
            wrap="wrap"
            gap={6}
            justify="flex-start"
            w="100%"
          >
            {playlists?.map((playlist: Playlist) => (
              <Box key={playlist.id}>
                <RadioCardItem
                  value={playlist.id}
                  borderColor="transparent"
                  cursor="pointer"
                  _checked={{
                    bg: "neutral.60",
                    borderColor: "primary.50",
                  }}
                  onChange={() => setPlaylist(playlist)}
                  label={
                    <Box
                      bgImage={`url(${playlist.snippet?.thumbnails?.high?.url})`}
                      bgSize="cover"
                      bgPos="center"
                      bgRepeat="no-repeat"
                      w="300px"
                      h="150px"
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
                          {playlist.snippet?.title}
                        </Text>
                        <Text fontSize="14px" color="neutral.20">
                          {playlist.contentDetails?.itemCount} vídeos{" "}
                        </Text>
                      </VStack>
                    </Box>
                  }
                />
              </Box>
            ))}
          </Flex>
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
            onClick={() => onIntegrate()}
          />
        </Flex>
      </VStack>
    </VStack>
  );
};

export default YoutubePlaylists;
