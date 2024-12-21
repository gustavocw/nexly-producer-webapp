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
      background-color: #1F1D22;
      height: 100%;
      width: 100%;
    }
    #root {
      height: 100%;
      width: 100%;
    }
      /* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #390A75 #A80BEB;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 3px;
  width: 3px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #A80BEB;
}

*::-webkit-scrollbar-track:hover {
  background-color: #7809C2;
}

*::-webkit-scrollbar-track:active {
  background-color: #800FC2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #390A75;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #570BA3;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #4F06A3;
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
