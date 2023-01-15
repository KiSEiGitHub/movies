import {
    Box, Flex, Heading,
    HStack,
    Image,
    Link,
    Tag,
    Text
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { TbFlame } from "react-icons/tb";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function Movies({ movie }: any) {
    console.log(movie);
    return (
        <Box
            bgImage={`https://image.tmdb.org/t/p/w500/${movie.all.backdrops[0]["file_path"]}`}
            h="auto"
            bgSize="cover"
        >
            <Box maxW="960px" px="55px" pt={10} textShadow="1px 1px #000">
                <Heading size="4xl">{movie.title}</Heading>
                <Text mt={6} fontSize="1.3em" textAlign="justify">
                    {movie.overview}
                </Text>
                <HStack mt={10} spacing={3}>
                    <Tag bg="pin" fontWeight={400} textShadow="none">
                        2h30
                    </Tag>
                    <Text fontWeight={600}>
                        {movie["production_companies"][0].name}
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
                <HStack mt={10} h="full" alignItems="center" pos="relative">
                    <TbFlame fontSize="2.5em" />
                    <Text fontSize="3em" color="pin">
                        {Math.round(movie["vote_average"] * 100) / 100}
                        <span
                            style={{
                                fontSize: "0.4em",
                                position: "absolute",
                                left: 145,
                                top: 10,
                                color: "#fff",
                            }}
                        >
                            / 10
                        </span>
                    </Text>
                </HStack>
            </Box>
            <Flex mt={20} px="55px" justifyContent="space-between">
                <Box>
                    <Heading mb={5}>Cast</Heading>
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        style={{
                            width: "700px",
                        }}
                    >
                        {movie.cast.map((item: any, key: any) => (
                            <SwiperSlide key={key}>
                                <Image
                                    src={item.photo}
                                    alt="ok"
                                    w="120px"
                                    borderRadius="lg"
                                />
                                <Heading size="sm" mt={3} textAlign="center">
                                    {item.name}
                                </Heading>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box>
                    <Heading mb={5}>Similar movies</Heading>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        style={{
                            width: "700px",
                            height: '254px'
                        }}
                    >
                        {movie.similarMovies.map((item: any, key: any) => (
                            <SwiperSlide key={key}>
                                <Link href={`/movie/${item.id}`}>
                                <Image
                                    src={item.photo}
                                    alt="ok"
                                    w="100%"
                                    h='full'
                                    borderRadius="lg"
                                    objectFit='cover'
                                    />
                                    </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Flex>
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

    const resCredit = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const { cast } = await resCredit.json();

    const resSim = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const { results: dataSim } = await resSim.json();

    data.all = dataImg;
    data.cast = cast;
    data.similarMovies = dataSim;

    data.similarMovies.forEach(
        (obj: any) =>
            (obj.photo =
                "https://image.tmdb.org/t/p/w500/" + obj["poster_path"])
    );

    data.cast.forEach(
        (obj: any) =>
            (obj.photo =
                "https://image.tmdb.org/t/p/w500/" + obj["profile_path"])
    );

    return {
        props: {
            movie: data,
        },
    };
};
