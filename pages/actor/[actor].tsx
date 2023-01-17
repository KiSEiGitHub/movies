import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Layout from "../../components/Layout";

function Actor({ actor }: any) {
  console.log(actor);

  return (
    <Layout title={actor.name}>
      <Box maxW="5xl" mx="auto">
        <Grid templateColumns="0.6fr 1fr" mx="auto" maxW="5xl" mt={5}>
          <GridItem colStart={1}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${actor["profile_path"]}`}
              alt="ok"
              w="250px"
              borderRadius="lg"
            />
            <Heading mt={4}>{actor.name}</Heading>
            <HStack alignItems="center" mt={4}>
              <Text>Popularity :</Text>
              <Text fontWeight={600} fontSize="1.2em" color="pin">
                {" "}
                {actor.popularity}
              </Text>
            </HStack>
          </GridItem>
          <GridItem colStart={2} borderRadius="xl">
            <Heading>Biography</Heading>
            <Text textAlign="justify" mt={4}>
              {actor.biography}
            </Text>
            <Divider my={5} />
            <HStack alignItems="center">
              <Text>Place of birth :</Text>
              <Text fontWeight={600} fontSize="1.2em">
                {" "}
                {actor["place_of_birth"]}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text>Profession :</Text>
              <Text fontWeight={600} fontSize="1.2em">
                {" "}
                {actor["known_for_department"]}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text>Birthday :</Text>
              <Text fontWeight={600} fontSize="1.2em">
                {" "}
                {actor["birthday"]}
              </Text>
            </HStack>
          </GridItem>
        </Grid>
        <Divider my={5} />
        <Heading>Movies Credits</Heading>
        <Box mt={5}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
          >
            {actor.cast.map((item: any, key: number) => (
              <SwiperSlide key={key}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item["poster_path"]}`}
                    alt="ok"
                    borderRadius="lg"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Layout>
  );
}

export default Actor;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { actor } = ctx.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${actor}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await res.json();

  const resCast = await fetch(
    `https://api.themoviedb.org/3/person/${actor}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const { cast } = await resCast.json();

  data.cast = cast;

  return {
    props: {
      actor: data,
    },
  };
};
