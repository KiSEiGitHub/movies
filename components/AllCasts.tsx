import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  Box,
  Image,
  Heading,
  Link,
  Divider,
} from "@chakra-ui/react";
import React from "react";

function AllCasts({ title, casts }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text
        onClick={onOpen}
        _hover={{ textDecoration: "underline" }}
        cursor="pointer"
        color="pin"
        fontWeight={700}
      >
        All casts
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Casts from : {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap="wrap" gap={5} justifyContent="center">
              {casts.map((item: any, key: number) => (
                <Box key={key} maxW="120px">
                  <Link href={`/actor/${item.id}`}>
                    <Image
                      src={item.photo}
                      alt={item.name}
                      w="120px"
                      mx="auto"
                      borderRadius="md"
                    />
                  </Link>
                  <Heading textAlign="center" fontWeight={400} mt={3} size="sm">
                    {item.character}
                  </Heading>
                  <Divider my={3}/>
                  <Heading textAlign="center" size="sm">
                    <Link href={`/actor/${item.id}`}>{item.name}</Link>
                  </Heading>
                </Box>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AllCasts;
