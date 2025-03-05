import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Text from "components/text/text";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface TitlePageProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  onAction?: () => void;
  backParams?: Record<string, any>;
}

const TitlePage = ({ title, description, onClick, onAction, backParams }: TitlePageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  
  useEffect(() => {
    if (backParams) {
      const lastPage = sessionStorage.getItem("previousPage");
      if (lastPage && lastPage !== location.pathname) {
        setPreviousPage(lastPage);
      }
      sessionStorage.setItem("previousPage", location.pathname);
    }
  }, [location, backParams]);

  const handleBack = () => {
    if (onClick)  {
      onClick();
    } else {
      if (onAction) {
        onAction();
      }
      if (previousPage && backParams) {
        navigate(previousPage, { state: backParams });
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <Box py={4}>
      <HStack w="100%" align="flex-start">
        <VStack mx={0} gap="10px">
          <HStack w="100%" onClick={handleBack} cursor="pointer">
            <Icon mt="1px" fontSize="32px" color="neutral">
              <KeyboardArrowLeftOutlinedIcon />
            </Icon>
            <Text.Medium fontSize="24px" fontWeight="medium" color="neutral">
              {title}
            </Text.Medium>
          </HStack>
          <Text.Medium ml="40px" fontSize="16px" color="neutral.10">
            {description}
          </Text.Medium>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TitlePage;
