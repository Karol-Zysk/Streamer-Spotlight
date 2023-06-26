import { Badge, Box, Flex, Icon } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { Streamer } from "../utils/interfaces";

const Voting: React.FC<{ streamer: Streamer }> = ({ streamer }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection={"column"}>
      <Flex w={"80%"} mb={"4"} justifyContent={"space-around"}>
        <Icon
          as={FaRegThumbsUp}
          fontSize="2rem"
          color="#0008f7"
          cursor="pointer"
          mr="0.5rem"
        />
        <Icon
          as={FaRegThumbsDown}
          fontSize="2rem"
          color="#e53e3e"
          cursor="pointer"
          mr="0.5rem"
        />
      </Flex>
      <Box>
        <Badge colorScheme="blue">Upvotes: {streamer.upvotes}</Badge>
        <Badge colorScheme="red">Downvotes: {streamer.downvotes}</Badge>
      </Box>
    </Box>
  );
};
export default Voting;
