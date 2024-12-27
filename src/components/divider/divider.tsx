import { Separator } from "@chakra-ui/react";

const Divider = ({ ...props }) => {
  return (
    <Separator
      py={props.py}
      alignSelf="center"
      w={props.width ? props.width : "90%"}
      mx={props.mx ? props.mx : "auto"}
      borderColor={props.color ? props.color : "neutral.40"}
    />
  );
};

export default Divider;
