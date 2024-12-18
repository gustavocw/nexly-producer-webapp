import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          DEFAULT: { value: "#F5E9FC" },
          10: { value: "#E9CEF8" },
          20: { value: "#D4A1F2" },
          30: { value: "#BE6FEB" },
          40: { value: "#AA43E5" },
          50: { value: "#9D2ED5" },
          60: { value: "#7517AA" },
          70: { value: "#56117E" },
          80: { value: "#3A0C55" },
          90: { value: "#1C0628" },
          95: { value: "#000000" },
        },
        error: {
          30: { value: "#F96565" },
          80: { value: "#F2B8B5" },
          90: { value: "#F9DEDC" },
          20: { value: "#601410" },
        },
        success: {
          20: { value: "#1B6010" },
          30: { value: "#288C18" },
          90: { value: "#BAF2B5" },
          91: { value: "#E4F9DC" },
        },
        info: {
          20: { value: "#102660" },
          30: { value: "#182B8C" },
          80: { value: "#B5B7F2" },
          90: { value: "#DCDDF9" },
        },
        warn: {
          20: { value: "#604E10" },
          30: { value: "#8C6C18" },
          80: { value: "#F2E1B5" },
          90: { value: "#F9EFDC" },
        },
        neutral: {
          5: { value: "#E8E6EA" },
          10: { value: "#A9A2B4" },
          20: { value: "#7F758F" },
          30: { value: "#575063" },
          40: { value: "#2E2A34" },
          50: { value: "#1D1B20" },
          60: { value: "#1D1B20" },
          70: { value: "#0D0C0E" },
          80: { value: "#050506" },
          90: { value: "#030203" },
          95: { value: "#1F1D22" },
        },
      },
    },
  },
});

const config = mergeConfigs(defaultConfig, theme);
const system = createSystem(config);

export default system;
