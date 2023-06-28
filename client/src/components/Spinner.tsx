import { Center, Spinner as Loading } from "@chakra-ui/react";

export const Spinner = () => {
  return (
    <Center h={"70vh"}>
      <Loading
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};
