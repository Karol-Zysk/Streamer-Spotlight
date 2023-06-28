import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Streamer } from "../interfaces";
import { ApiClient } from "../services/ApiClient";
import { Platform } from "../enums";

interface AddStreamerProps {
  onClose: () => void;
  isOpen: boolean;
  setStreamers: React.Dispatch<React.SetStateAction<Streamer[] | undefined>>;
}

export const AddStreamerModal: React.FC<AddStreamerProps> = ({
  onClose,
  isOpen,
  setStreamers,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newStreamer, setNewStreamer] = useState<
    Pick<Streamer, "name" | "description" | "platform" | "image">
  >({
    name: "",
    description: "",
    platform: Platform.YouTube,
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
  });
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const apiClient = new ApiClient();
      await apiClient.post("/streamers", newStreamer);
      onClose();
      setNewStreamer({
        name: "",
        description: "",
        platform: Platform.YouTube,
        image:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
      });
      const updatedStreamers = await apiClient.get<Streamer[]>("/streamers");
      setStreamers(updatedStreamers);
      toast({
        title: "Success",
        description: "New Streamer Created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message.join(", "),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        boxShadow="2px 2px 2px 2px"
        p={["4", "8"]}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <ModalHeader>Add New Streamer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontWeight={"semibold"}>Name</FormLabel>
            <Input
              placeholder="Streamer Name"
              mb="4"
              name="name"
              value={newStreamer.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"}>Description</FormLabel>
            <Input
              placeholder="Short Description"
              mb="4"
              name="description"
              value={newStreamer.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"}>Platform</FormLabel>
            <Select
              mb="4"
              name="platform"
              value={newStreamer.platform}
              onChange={handleInputChange}
            >
              {Object.values(Platform).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"}>Image</FormLabel>
            <Input
              name="image"
              value={newStreamer.image}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button border={"1px"} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
