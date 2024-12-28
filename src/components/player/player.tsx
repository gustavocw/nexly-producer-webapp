import { VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import ReactPlayer from "react-player";
import { Alert } from "components/ui/alert";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface PlayerProps {
  videoUrl: string;
}

const Player: React.FC<PlayerProps> = ({ videoUrl }) => {
  return (
    <VStack align="flex-start" w="100%">
      <TitlePage title="Video" />
      <Alert
        p="10px"
        icon={<WarningAmberIcon />}
        bg="error.80"
        status="warning"
        title="Certifique-se de revisar todas as aulas, Alterações posteriores podem ser feitas, mas é importante garantir a precisão desde o início."
      />
      <VStack w="100%" justify="center">
        <ReactPlayer
          width="100%"
          height="550px"
          url={videoUrl}
        />
      </VStack>
    </VStack>
  );
};

export default Player;
