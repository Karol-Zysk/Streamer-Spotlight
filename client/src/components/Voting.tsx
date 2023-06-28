import { Badge, Box, Flex, Icon, useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { Streamer } from "../interfaces";
import { useState } from "react";
import { ApiClient } from "../services/ApiClient";

interface VotingProps {
  streamer: Streamer;
}

export const Voting: React.FC<VotingProps> = ({ streamer }) => {
  const [voted, setVoted] = useState(false);
  const [updatedStreamer, setUpdatedStreamer] = useState(streamer);
  const [votingType, setVotingType] = useState<"upVote" | "downVote" | null>(
    null
  );
  const toast = useToast();
  const apiClient = new ApiClient();

  const onVote = async (id: string, voteType: "upVote" | "downVote") => {
    try {
      const updatedStreamer = await apiClient.put<Streamer>(
        `/streamers/${id}/vote`,
        {
          voteType,
        }
      );
      setVotingType(voteType);
      setUpdatedStreamer(updatedStreamer);
      setVoted(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVote = (voteType: "upVote" | "downVote") => {
    if (!voted) {
      onVote(streamer._id, voteType);
    }
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Flex w="40%" mb="4" justifyContent="space-around">
        <Icon
          as={FaRegThumbsUp}
          fontSize="2rem"
          color={votingType === "upVote" ? "#0008f7" : "#656e7a"}
          mr="0.5rem"
          _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
          onClick={() => handleVote("upVote")}
        />
        <Icon
          as={FaRegThumbsDown}
          fontSize="2rem"
          color={votingType === "downVote" ? "#e53e3e" : "#656e7a"}
          _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
          mr="0.5rem"
          onClick={() => handleVote("downVote")}
        />
      </Flex>
      <Box>
        <Badge colorScheme="blue">Upvotes: {updatedStreamer.upvotes}</Badge>{" "}
        <Badge colorScheme="red">Downvotes: {updatedStreamer.downvotes}</Badge>{" "}
      </Box>
    </Box>
  );
};
