import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex, useColorModeValue } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("#c1aaf6", "#09011c");
  return (
    <Flex minH="100vh" bg={bg} direction="column">
      <Navbar />

      <Flex direction="column" h="100%" flex="1" p="10">
        {children}
      </Flex>
    </Flex>
  );
};
export default Layout;
