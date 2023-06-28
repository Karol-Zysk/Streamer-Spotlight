import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Center h="70vh">
      <Box textAlign="center" fontSize="xl">
        <Heading mb={6}>404</Heading>
        <Text mb={6}>Page Not Found</Text>
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
      </Box>
    </Center>
  );
};
