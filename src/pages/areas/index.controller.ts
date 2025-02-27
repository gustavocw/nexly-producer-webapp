import { useProducts } from "contexts/ProductsContext";
import { checkDomainStatus } from "utils/domainVercel";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAreasController = () => {
  const { areas, loadingAreas } = useProducts();
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [step, setStep] = useState<"list" | "form">("list");
  const location = useLocation();
  const section = location.state?.section;
  const [selectedTab, setSelectedTab] = useState("areas");

  const optionsNav = [
    { label: `Areas (${areas?.length || 0})`, value: "areas" },
    { label: "Dominios", value: "domains" },
  ];

  useEffect(() => {
    if (section || location.state) {
      setSelectedTab(section || location.state);
    }
  }, [section, location.pathname]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleAreaClick = (area: Area) => {
    setSelectedArea(area);
    setStep("form");
  };

  const handleNewArea = () => {
    setStep("form");
  };

  const goBack = () => {
    setSelectedArea(null);
    setStep("list");
  };

  const verifyDomains = async () => {
    if (!areas || areas.length === 0) return;
    const newStatuses: { [key: string]: string } = {};
    for (const area of areas) {
      if (area.domain && area._id) {
        const result = await checkDomainStatus(area.domain);
        if (result.error) {
          newStatuses[area._id] = "⏳ Aguardando configuração DNS";
        } else {
          newStatuses[area._id] = "✅ Domínio configurado corretamente!";
        }
      }
    }
  };

  useEffect(() => {
    verifyDomains();
  }, [areas]);

  return {
    areas,
    loadingAreas,
    selectedArea,
    step,
    selectedTab,
    optionsNav,
    handleTabChange,
    handleAreaClick,
    handleNewArea,
    goBack,
    verifyDomains,
  };
};
