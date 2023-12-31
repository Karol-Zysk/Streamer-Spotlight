import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ApiClient } from "../services/ApiClient";
import { Streamer } from "../interfaces";
import {
  Flex,
  Text,
  Button,
  useDisclosure,
  Grid,
  useToast,
  Box,
} from "@chakra-ui/react";
import {
  AddStreamerModal,
  ErrorMessage,
  Spinner,
  StreamerCard,
} from "../components";

export const Streamers = () => {
  const [streamers, setStreamers] = useState<Streamer[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const toast = useToast();

  const apiClient = useMemo(() => new ApiClient(), []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getStreamers = async () => {
      try {
        const res = await apiClient.get<Streamer[]>(`/streamers`);
        setStreamers(res);
      } catch (error: any) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message.join(", "),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    getStreamers();
  }, [apiClient]);

  const handleAddStreamer = () => {
    onOpen();
  };

  if (error) return <ErrorMessage error={error} />;

  if (!streamers) return <Spinner />;

  return (
    <Flex direction="column" justify={"center"} align={"center"}>
      <Button
        size={"lg"}
        w="min-content"
        border={"2px"}
        boxShadow={"0px 0px 2px 2px purple"}
        mt={"2"}
        mb={"8"}
        onClick={handleAddStreamer}
      >
        Add Streamer
      </Button>

      <AddStreamerModal
        isOpen={isOpen}
        onClose={onClose}
        setStreamers={setStreamers}
      />

      {streamers.length === 0 ? (
        <Text>No Active Streamers Yet</Text>
      ) : (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
        >
          {streamers.map((streamer: Streamer, index: number) => (
            <Box
              as={motion.div}
              key={streamer._id}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: `${index * 0.2}` }}
            >
              <StreamerCard streamer={streamer} />
            </Box>
          ))}
        </Grid>
      )}
    </Flex>
  );
};
