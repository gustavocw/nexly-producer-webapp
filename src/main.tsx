import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "utils/theme.ts";
const GlobalStyles = () => (
  <style>
    {`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-weight: 500px,
    }
    html, body {
      background-color: #2E2A34;
      height: 100%;
      width: 100%;
    }
    #root {
      height: 100%;
      width: 100%;
    }
  `}
  </style>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <GlobalStyles />
      <App />
    </ChakraProvider>
  </StrictMode>
);
