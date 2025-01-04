export   const getPlanStyles = (planType?: string) => {
  switch (planType) {
    case "visitor":
      return {
        bg: "transparent",
        border: "1px solid",
        borderColor: "neutral.40",
        text: "FREE",
        textColor: "neutral",
      };
    case "pro":
      return {
        bg: "neutral",
        border: "none",
        text: "PRO",
        textColor: "neutral",
      };
    case "premium":
      return {
        bg: "primary.50",
        border: "none",
        text: "PREMIUM",
        textColor: "neutral",
      };
    case "bigger":
      return {
        bg: "linear-gradient(to right, pink, purple)",
        border: "none",
        text: "ELITE",
        textColor: "neutral",
      };
    default:
      return {
        bg: "neutral",
        border: "none",
        text: "N/A",
        textColor: "neutral",
      };
  }
};