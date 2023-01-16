import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { theme } from "../theme/theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Nav />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
