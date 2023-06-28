import { useParams } from "react-router-dom";
import { Streamer } from "../interfaces";
import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../services/ApiClient";
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ErrorMessage, Spinner } from "../components";

export const StreamerPage = () => {
  const [streamer, setStreamer] = useState<Streamer | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { id } = useParams();
  const bg = useColorModeValue("blackAlpha.400", "whiteAlpha.300");

  const apiClient = useMemo(() => new ApiClient(), []);
  const getStreamer = async () => {
    try {
      const res: Streamer = await apiClient.get(`/streamers/${id}`);
      setStreamer(res);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getStreamer();
  }, []);

  if (error) return <ErrorMessage error={error} />;

  if (!streamer) return <Spinner />;

  return (
    <Flex
      marginTop={"auto"}
      marginBottom={"auto"}
      alignSelf={"center"}
      direction={"column"}
      w={["xs", "lg", "xl"]}
      border={"2px"}
      borderRadius="lg"
      boxShadow="3px 3px 2px 2px"
      bg={bg}
      minH={"35vh"}
      p={"4"}
    >
      <Flex p="2" justify={"space-between"}>
        <Text fontWeight="bold" fontSize={["xl", "3xl"]} mt="4">
          {streamer.name}
        </Text>

        <Avatar size={["lg", "xl"]} src={streamer.image} name={streamer.name} />
      </Flex>

      <Box mt="4" fontSize={["md", "lg"]}>
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
