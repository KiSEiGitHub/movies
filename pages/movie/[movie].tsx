import { Box, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { IoMdFlame } from "react-icons/io";

function Movies({ movie }: any) {
    console.log(movie);
    return (
        <Box
            bgImage={`https://image.tmdb.org/t/p/w500/${movie.all.backdrops[4]["file_path"]}`}
            h="100vh"
            bgSize="cover"
        >
            <Box maxW="960px" px="55px" pt={10} textShadow="1px 1px #000">
                <Heading size="4xl">{movie.title}</Heading>
                <Text mt={6} fontSize="1.3em" textAlign="justify">
                    {movie.overview}
                </Text>
                <HStack mt={10} spacing={3}>
                    <Tag colorScheme="pink">2h30</Tag>
                    <Text fontWeight={600}>
                        {movie["production_companies"][1].name}
                    </Text>
                </HStack>
                <HStack mt={4} spacing={3}>
                    <Text fontWeight={600}>{movie["release_date"]}</Text>
                    {movie.genres.map((item: any, key: any) => (
                        <Tag key={key} fontWeight={600}>
                            {item.name}
                        </Tag>
                    ))}
                </HStack>
                <Box mt={10}>
                    <Image src="./flame.png" alt="ok" />
                </Box>
            </Box>
        </Box>
    );
}

export default Movies;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { movie } = ctx.query;

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await res.json();

    const resImg = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const dataImg = await resImg.json();

    data.all = dataImg;

    return {
        props: {
            movie: data,
        },
    };
};
