import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue(
    "linear-gradient(to right, #9e76fc, transparent)",
    "linear-gradient(to right, #100629, transparent)"
  );

  return (
    <Box bg={color} borderBottom={"4px"} px={4} py={2}>
      <Flex h="min" p="4" align={"center"} justifyContent={"space-between"}>
        <Text
          filter={"blur(0.06rem)"}
          _hover={{
            cursor: "pointer",
            filter: "blur(0.01rem)",
            transition: "500ms ease-in-out",
          }}
          fontSize={["xl", "3xl"]}
          onClick={() => navigate(`/streamers`)}
          textShadow={"3px 3px 4px  purple"}
        >
          Streamer Spotlight
        </Text>
        <Button size={"sm"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
};
