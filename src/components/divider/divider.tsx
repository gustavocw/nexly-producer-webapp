import { Separator } from "@chakra-ui/react";

const Divider = ({ ...props }) => {
  return (
    <Separator
      alignSelf="center"
      w={props.width ? props.width : "90%"}
      mx={props.mx ? props.mx : "auto"}
      borderBottom={props.border ? props.border : "1px solid"}
      borderColor={props.color ? props.color : "neutral.40"}
    />
  );
};

export default Divider;
