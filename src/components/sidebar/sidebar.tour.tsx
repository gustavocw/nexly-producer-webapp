import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { steps } from "./items";

const TOUR_STORAGE_KEY = "sidebarTourCompleted";

const SidebarTour: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(TOUR_STORAGE_KEY);
    
    if (!hasSeenTour) {
      setTimeout(() => {
        setRun(true);
      }, 500);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      locale={{
        back: "Voltar",
        close: "Fechar",
        last: "Finalizar",
        next: "Próximo",
        skip: "Pular",
      }}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#AA43E5",
          textColor: "#ffffff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          spotlightShadow: "0px 0px 15px rgba(107, 70, 193, 0.7)",
          backgroundColor: "#1D1B20"
        },
        buttonNext: {
          backgroundColor: "#AA43E5",
          color: "#fff",
        },
        buttonBack: {
          color: "#AA43E5",
        },
        buttonSkip: {
          color: "#AA43E5",
        },
      }}
    />
  );
};

export default SidebarTour;
