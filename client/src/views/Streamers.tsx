import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../utils/ApiClient";
import { Streamer } from "../utils/interfaces";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import StreamerCard from "../components/StreamerCard";

const Streamers = () => {
  const [streamers, setStreamers] = useState<Streamer[] | undefined>(undefined);
  const apiClient = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const getStreamers = async () => {
      try {
        const res = await apiClient.get<Streamer[]>(`/streamers`);

        setStreamers(res);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getStreamers();
  }, []);

  if (!streamers)
    return (
      <Flex minH={"full"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );

  return (
    <Flex>
      {streamers.length === 0
        ? "No Active Streamers Yet"
        : streamers.map((streamer: Streamer) => {
            return <StreamerCard streamer={streamer} key={streamer._id} />;
          })}
    </Flex>
  );
};
export default Streamers;
