import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';

interface PlanProps {
  click: (plan: 'anual' | 'mensal') => void
}

const HeaderPlans: React.FC<PlanProps> = ({ click }) => {
  const [selectedPlan, setSelectedPlan] = useState<'anual' | 'mensal'>('anual');

  const handleClick = (plan: 'anual' | 'mensal') => {
    setSelectedPlan(plan);
    click(plan);
  };

  return (
    <Flex pt="20" mb="8" w="95%" mx="auto" justify="space-between">
      <Box>
        <Heading as="h1" size="xl" color="white">Conheça nossos planos</Heading>
        <Text fontSize="lg" color="white" mt="4">
          Pensamos em soluções adequadas com o tamanho do desafio <br /> que você tem. Confira nossos planos ao lado.
        </Text>
      </Box>
      <Flex justify="flex-end" mt="4">
        <Button
          bg={selectedPlan === 'anual' ? 'primary.50' : 'neutral.60'}
          variant="ghost"
          borderColor="transparent"
          borderRadius="50px"
          color="white"
          mr="2"
          zIndex="1"
          onClick={() => handleClick('anual')}
          px={7}
        >
          Anual
        </Button>
        <Button
          bg={selectedPlan === 'mensal' ? 'primary.50' : 'neutral.60'}
          variant="ghost"
          borderColor="transparent"
          borderRadius="50px"
          color="white"
          pl={15}
          w="120px"
          right="40px"
          position="relative"
          onClick={() => handleClick('mensal')}
        >
          Mensal
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeaderPlans;
