export const getPlanStyles = (planType?: string) => {
  switch (planType) {
    case "visitor":
      return {
        bg: "transparent",
        border: "1px solid",
        borderColor: "neutral.40",
        text: "FREE",
        textColor: "neutral",
        monthlyPrice: 0,
        annualPrice: 0,
      };
    case "basic":
      return {
        bg: "neutral",
        border: "none",
        text: "STARTER",
        textColor: "neutral.60",
        monthlyPrice: 29700,
        annualPrice: 237600,
      };
    case "pro":
      return {
        bg: "primary.50",
        border: "none",
        text: "PRO",
        textColor: "neutral",
        monthlyPrice: 49700,
        annualPrice: 397600,
      };
    case "bigger":
      return {
        bg: "linear-gradient(90deg, #7F00FF, #E100FF)",
        border: "none",
        text: "PREMIUM",
        textColor: "neutral",
        monthlyPrice: 79700,
        annualPrice: 637600,
      };
    default:
      return {
        bg: "neutral",
        border: "none",
        text: "N/A",
        textColor: "neutral",
        monthlyPrice: 0,
        annualPrice: 0,
      };
  }
};
