import { Flex, Icon, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


export const renderMenuItem = (item: any, isOpen: boolean) => (
  <NavLink
    to={item.path !== "/comunidade" ? item.path : undefined}
    key={item.path}
    style={{ width: "100%", zIndex: 9999 }}
  >
    {({ isActive }) => (
      <Flex
        justify={isOpen ? "flex-start" : "center"}
        align="center"
        mb="2"
        cursor="pointer"
        bg={isActive && item.path !== "/comunidade" ? "primary.80" : "transparent"}
        borderRadius="8px"
        p="8px"
        _hover={{ textDecoration: "none" }}
        w="100%"
      >
        <Icon
          color={
            isActive && item.path !== "/comunidade" ? "primary.20" : "neutral.20"
          }
          w={isOpen ? "10%" : "80%"}
        >
          {item.icon}
        </Icon>
        {isOpen && (
          <Text
            fontWeight="medium"
            color={
              isActive && item.path !== "/comunidade"
                ? "primary.20"
                : "neutral.20"
            }
            ml="2"
          >
            {item.label}
          </Text>
        )}
      </Flex>
    )}
  </NavLink>
);
