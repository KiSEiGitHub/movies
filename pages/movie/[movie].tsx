import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { TbFlame } from "react-icons/tb";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import AllCasts from "../../components/AllCasts";
import Layout from "../../components/Layout";

function Movies({ movie }: any) {
  console.log(movie);
  const mainCast = movie.cast.slice(0, 9);
  return (
    <Layout title={movie.title}>
      <Box
        bgImage={`https://image.tmdb.org/t/p/w1280/${movie.all.backdrops[0]["file_path"]}`}
        h="100vh"
        bgSize="cover"
        bgBlendMode="darken"
        bgPos="center"
      >
        <Box maxW="960px" px="55px" pt={10} textShadow="1px 1px #000">
          <Heading size="4xl">{movie.title}</Heading>
          <Text mt={6} fontSize="1.3em" textAlign="justify">
            {movie.overview}
          </Text>
          <HStack mt={10} spacing={3}>
            <Tag bg="pin" fontWeight={400} textShadow="none">
              {movie.runtime} min
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
        <Flex mt={20} px="55px" justifyContent="space-between" maxW="1920px">
          <Box>
            <HStack spacing={3}>
              <Heading mb={5}>Cast</Heading>
              <AllCasts title={movie.title} casts={movie.cast} />
            </HStack>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              pagination={{
                clickable: true,
              }}
              style={{
                width: "700px",
              }}
            >
              {mainCast.map((item: any, key: any) => (
                <SwiperSlide key={key}>
                  <Link href={`/actor/${item.id}`}>
                    <Image
                      src={item.photo}
                      alt="ok"
                      w="120px"
                      borderRadius="lg"
                      mx="auto"
                    />
                  </Link>
                  <Tag size="md" bg="pin" mx="auto" mt={3}>
                    {item.character}
                  </Tag>
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
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              pagination={{
                clickable: true,
              }}
              style={{
                width: "700px",
                height: "254px",
              }}
            >
              {movie.similarMovies.map((item: any, key: any) => (
                <SwiperSlide key={key}>
                  <Link href={`/movie/${item.id}`}>
                    <Image
                      src={item.photo}
                      alt="ok"
                      w="100%"
                      h="full"
                      borderRadius="lg"
                      objectFit="cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Flex>
      </Box>
    </Layout>
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
      (obj.photo = "https://image.tmdb.org/t/p/w780/" + obj["poster_path"])
  );

  data.cast.forEach(
    (obj: any) =>
      (obj.photo = "https://image.tmdb.org/t/p/w780/" + obj["profile_path"])
  );

  return {
    props: {
      movie: data,
    },
  };
};
