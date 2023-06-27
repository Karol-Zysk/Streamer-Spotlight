import { Box, Text, Flex, useColorModeValue, Icon } from "@chakra-ui/react";

import { Streamer } from "../utils/interfaces";
import Voting from "./Voting";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const StreamerCard: React.FC<{ streamer: Streamer }> = ({ streamer }) => {
  const navigate = useNavigate();
  return (
    <Box
      _hover={{ opacity: 1, cursor: "pointer" }}
      minW="sm"
      w={"sm"}
      border={"2px"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="3px 3px 3px 3px"
      bg={useColorModeValue("blackAlpha.400", "whiteAlpha.300")}
      p={"4"}
    >
      <Flex p="2" py="4" justify={"space-around"}>
        <Text fontWeight="bold" fontSize="xl">
          {streamer.name}
        </Text>

        <Icon
          as={ArrowRightIcon}
          _hover={{ transform: "translateX(8px)", transition: "300ms ease" }}
          fontSize={24}
          onClick={() => navigate(`/${streamer._id}`)}
        ></Icon>
      </Flex>

      <Box mt="4">
        {/* <Text fontSize="md" mb="2">
          <strong>Description:</strong> {streamer.description}
        </Text> */}
        {/* <Text colorScheme="green" mb="2">
          <strong>Platform:</strong> {streamer.platform}
        </Text> */}

        <Voting streamer={streamer} />
      </Box>
    </Box>
  );
};

export default StreamerCard;
