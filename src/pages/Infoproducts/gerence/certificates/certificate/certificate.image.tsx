import { Box, Image, Text } from "@chakra-ui/react";

interface CertificateImageProps {
  logo: any;
  fundo: any;
  assinatura: string;
  descricao?: string;
  nome: string;
  curso: string;
}

const CertificateImage: React.FC<CertificateImageProps> = ({
  logo,
  fundo,
  assinatura,
  descricao,
  nome,
  curso,
}) => {
  const getImageUrl = (image: any) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  };

  return (
    <Box
      w="700px"
      h="400px"
      position="relative"
      bgImage={`url(${getImageUrl(fundo)})`}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPos="center"
      borderRadius="8px"
      boxShadow="lg"
      p="16px"
    >
      {logo && (
        <Image
          src={getImageUrl(logo)}
          w="80px"
          position="absolute"
          top="16px"
          left="16px"
        />
      )}

      <Text
        fontSize="32px"
        fontWeight="bold"
        color="white"
        textAlign="center"
        mt="32px"
      >
        Certificado
      </Text>

      <Text
        fontSize="20px"
        fontWeight="600"
        color="white"
        textAlign="center"
        mt="24px"
      >
        Conferimos esse certificado a
      </Text>
      <Text
        fontSize="24px"
        fontWeight="bold"
        color="white"
        textAlign="center"
        mt="8px"
      >
        {nome}
      </Text>

      <Text
        fontSize="18px"
        fontWeight="500"
        color="white"
        textAlign="center"
        mt="8px"
      >
        Pela conclusão do curso: <b>{curso}</b>
      </Text>

      <Text
        fontSize="14px"
        fontWeight="400"
        color="white"
        textAlign="center"
        mt="16px"
        px="24px"
      >
        {descricao}
      </Text>

      <Box position="absolute" bottom="16px" left="16px" textAlign="center">
        <Text fontSize="16px" fontWeight="400" color="white">
          {assinatura}
        </Text>
        <Text fontSize="14px" fontWeight="400" color="white" fontStyle="italic">
          Nexly members
        </Text>
      </Box>

      <Text
        position="absolute"
        bottom="16px"
        right="16px"
        fontSize="14px"
        fontWeight="400"
        color="white"
      >
        00/00/0000
      </Text>
    </Box>
  );
};

export default CertificateImage;
