import { Box, Text, Avatar, Flex } from "@chakra-ui/react";

import { Streamer } from "../utils/interfaces";
import Voting from "./Voting";

const StreamerCard: React.FC<{ streamer: Streamer }> = ({ streamer }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={"whiteAlpha.100"}
      p={"4"}
    >
      <Flex p="2" justify={"space-between"}>
        <Text fontWeight="bold" fontSize="xl" mt="4">
          {streamer.name}
        </Text>

        <Avatar size={"lg"} src={streamer.image} name={streamer.name} />
      </Flex>

      <Box mt="4">
        <Text fontSize="md" color="gray.100" mb="2">
          <strong>Description:</strong> {streamer.description}
        </Text>
        <Text colorScheme="green" mb="2">
          <strong>Platform:</strong> {streamer.platform}
        </Text>

        <Voting streamer={streamer} />
      </Box>
    </Box>
  );
};

export default StreamerCard;
