import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerHeader,
    DrawerOverlay,
    Link,
    useColorMode, useDisclosure
} from "@chakra-ui/react";

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box pos="fixed" right={10} top={5} zIndex={5}>
      <Button onClick={onOpen} variant="outline">
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Movies</DrawerHeader>

          <DrawerBody>
            <Link href="/">Home</Link>
            <Button onClick={toggleColorMode} display='block'>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Nav;
