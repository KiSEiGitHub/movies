import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Home({ movies }: any) {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <Text>CHARGEMENT</Text>
    }

    return (
        <Layout title='Home'>
            <Flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                gap={5}
                p={5}
            >
                {movies.map((item: any, key: number) => (
                    <Box
                        key={key}
                        w="450px"
                        h="auto"
                        bg="teal"
                        borderRadius="lg"
                        pos="relative"
                    >
                        <Link href={`/movie/${item.id}`}>
                            <Image
                                src={item.img}
                                alt="ok"
                                w="100%"
                                h="auto"
                                borderRadius="lg"
                                cursor="pointer"
                            />
                        </Link>
                    </Box>
                ))}
            </Flex>
        </Layout>
    );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const { results } = await res.json();

    results.forEach(
        (obj: any) => (
            (obj.img = "https://image.tmdb.org/t/p/w500/" + obj["poster_path"]),
            (obj.wallpaper =
                "https://image.tmdb.org/t/p/w500/" + obj["backdrop_path"])
        )
    );
    return {
        props: {
            movies: results,
        },
    };
};
