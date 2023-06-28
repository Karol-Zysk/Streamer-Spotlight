import { Button, Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  return (
    <Center h={"70vh"} flexDirection={"column"}>
      <Text fontWeight={"semibold"} fontSize={"lg"} mb={6}>
        {error}
      </Text>
      {error !== "Network Error" && (
        <Button
          as={Link}
          to="/streamers"
          size={"lg"}
          w="min-content"
          border={"2px"}
          boxShadow={"0px 0px 2px 2px purple"}
        >
          Back To Main Page
        </Button>
      )}
    </Center>
  );
};
