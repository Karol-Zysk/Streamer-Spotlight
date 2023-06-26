import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../utils/ApiClient";
import { Streamer } from "../utils/interfaces";
import {
  Flex,
  Spinner,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import StreamerCard from "../components/StreamerCard";

import { Platform } from "../utils/enums";

const Streamers = () => {
  const [streamers, setStreamers] = useState<Streamer[] | undefined>(undefined);
  const [newStreamer, setNewStreamer] = useState<any>({
    name: "",
    description: "",
    platform: "",
    image: "",
  });
  const apiClient = useMemo(() => new ApiClient(), []);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, [apiClient]);

  const handleAddStreamer = () => {
    onOpen(); // Otwarcie modala
  };

  const handleSubmit = async () => {
    try {
      await apiClient.post("/streamers", newStreamer);
      onClose(); // Zamknięcie modala po pomyślnym dodaniu streamera
      setNewStreamer({
        name: "",
        description: "",
        platform: "",
        image: "",
      });
      // Aktualizacja listy streamerów
      const updatedStreamers = await apiClient.get<Streamer[]>("/streamers");
      setStreamers(updatedStreamers);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStreamer((prevStreamer) => ({
      ...prevStreamer,
      [name]: value,
    }));
  };

  if (!streamers)
    return (
      <Flex minH={"full"} alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );

  return (
    <Flex direction="column">
      <Button mt="2" onClick={handleAddStreamer}>
        Dodaj streamera
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj streamera</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nazwa</FormLabel>
              <Input
                name="name"
                value={newStreamer.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Opis</FormLabel>
              <Input
                name="description"
                value={newStreamer.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Platforma</FormLabel>
              <Select
                name="platform"
                value={newStreamer.platform}
                onChange={handleInputChange}
              >
                <option value="">Wybierz platformę</option>
                {/* Dodaj opcje dla wszystkich wartości z enumu Platform */}
                {Object.values(Platform).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Obrazek</FormLabel>
              <Input
                name="image"
                value={newStreamer.image}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Dodaj
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Anuluj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {streamers.length === 0 ? (
        <Text>No Active Streamers Yet</Text>
      ) : (
        streamers.map((streamer: Streamer) => (
          <StreamerCard streamer={streamer} key={streamer._id} />
        ))
      )}
    </Flex>
  );
};

export default Streamers;
