import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Text from "components/text/text";
import { useNavigate } from "react-router-dom";

interface TitlePageProps {
  title: string;
  description?: string;
}

const TitlePage = ({ title, description }: TitlePageProps) => {
  const navigate = useNavigate();

  return (
    <Box py={4}>
      <HStack w="100%" align="flex-start">
        <VStack mx={0} gap="10px">
          <HStack w="100%" onClick={() => navigate(-1)} cursor="pointer">
            <Icon mt="1px" fontSize="32px" color="neutral">
              <KeyboardArrowLeftOutlinedIcon />
            </Icon>
            <Text.Medium fontSize="24px" fontWeight="medium" color="neutral">
              {title}
            </Text.Medium>
          </HStack>
          <Text.Medium ml="48px" fontSize="16px" color="neutral.10">
            {description}
          </Text.Medium>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TitlePage;
