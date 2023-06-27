import { useParams } from "react-router-dom";
import { Streamer } from "../utils/interfaces";
import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../utils/ApiClient";
import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const StreamerPage = () => {
  const [streamer, setStreamer] = useState<Streamer | undefined>(undefined);
  const toast = useToast();
  const { id } = useParams();
  const bg = useColorModeValue("blackAlpha.400", "whiteAlpha.300");

  const apiClient = useMemo(() => new ApiClient(), []);

  const getStreamer = async () => {
    try {
      const res: Streamer = await apiClient.get(`/streamers/${id}`);
      setStreamer(res);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Invalid User Id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(streamer);

  useEffect(() => {
    getStreamer();
  }, []);

  if (!streamer)
    return (
      <Flex minH={"full"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"lg"} speed="0.8s" />
      </Flex>
    );

  return (
    <Flex
      marginTop={"auto"}
      marginBottom={"auto"}
      alignSelf={"center"}
      direction={"column"}
      minW="xl"
      w={"xl"}
      border={"2px"}
      borderRadius="lg"
      boxShadow="4px 4px 4px 4px"
      bg={bg}
      minH={"40vh"}
      p={"4"}
    >
      <Flex p="2" justify={"space-between"}>
        <Text fontWeight="bold" fontSize="3xl" mt="4">
          {streamer.name}
        </Text>

        <Avatar size={"xl"} src={streamer.image} name={streamer.name} />
      </Flex>

      <Box mt="4" fontSize="lg">
        <Text mb="2">
          <strong>Description:</strong> {streamer.description}
        </Text>
        <Text mb="2">
          <strong>Platform:</strong> {streamer.platform}
        </Text>
      </Box>
    </Flex>
  );
};
export default StreamerPage;
