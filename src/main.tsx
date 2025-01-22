import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "utils/theme.ts";
import { GlobalStyles } from "utils/style.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
        <GlobalStyles />
        <App />
    </ChakraProvider>
  </StrictMode>
);
