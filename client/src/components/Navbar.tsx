import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue(
    "linear-gradient(to right, #9e76fc, transparent)",
    "linear-gradient(to right, #100629, transparent)"
  );

  return (
    <Box bg={color} px={4} py={2}>
      <Flex h="min" p="4" align={"center"} justifyContent={"space-between"}>
        <Heading textShadow={"2px 2px 3px  purple"}>Streamer Spotlight</Heading>
        <Button size={"sm"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
}
