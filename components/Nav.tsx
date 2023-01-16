import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pos="fixed" right={10} top={5} zIndex={5}>
      <Button onClick={onOpen} variant="outline">
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Movies</DrawerHeader>

          <DrawerBody>
            <Link href='/'>Home</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Nav;
