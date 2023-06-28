import { Box, Text, Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { Streamer } from "../interfaces";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Voting } from ".";

export const StreamerCard: React.FC<{ streamer: Streamer }> = ({
  streamer,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      _hover={{ opacity: 1, cursor: "pointer" }}
      minW={["xs", "xs", "sm"]}
      w={["xs", "xs", "sm"]}
      border={"2px"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="3px 3px 2px 2px"
      bg={useColorModeValue("blackAlpha.400", "whiteAlpha.300")}
      p={["2", "4"]}
    >
      <Flex p="2" py="4" justify={"space-around"}>
        <Text fontWeight="bold" fontSize="xl">
          {streamer.name}
        </Text>

        <Icon
          as={ArrowRightIcon}
          _hover={{ transform: "translateX(8px)", transition: "300ms ease" }}
          fontSize={24}
          onClick={() => navigate(`/streamers/${streamer._id}`)}
        ></Icon>
      </Flex>

      <Box mt="4">
        <Voting streamer={streamer} />
      </Box>
    </Box>
  );
};
