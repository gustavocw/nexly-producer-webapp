import { VStack } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Alert } from "components/ui/alert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useVideosStore from "stores/videos.store";

interface PlayerProps {
  videoUrl: string;
}

const Player: React.FC<PlayerProps> = ({ videoUrl }) => {
  const { setDuration } = useVideosStore();

  const handleDuration = async (time: string) => {
    console.log(time);
    setDuration(time)
  }

  return (
    <VStack align="flex-start" w="100%">
      <Alert
        p="10px"
        icon={<WarningAmberIcon />}
        bg="error.80"
        status="warning"
        title="Certifique-se de revisar todas as aulas. Alterações posteriores podem ser feitas, mas é importante garantir a precisão desde o início."
      />
      <VStack w="100%" justify="center">
        <ReactPlayer
          width="100%"
          height="550px"
          url={videoUrl}
          onDuration={async (duration) => await handleDuration(duration.toString())}
          controls
        />
      </VStack>
    </VStack>
  );
};

export default Player;
