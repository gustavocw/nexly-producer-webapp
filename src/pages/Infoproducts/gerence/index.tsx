import { Flex, HStack, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import TitlePage from "components/titlePage/titlePage";
import Informations from "./informations/informations";
import Modules from "./modules/modules";
import Certificates from "./certificates/certificates";
import { ModalCreateModule } from "./modules/modal/modal.create.module";
import { useGenrenceInfoproduct } from "./index.controller";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GenrenceInfoproduct = () => {
  const { product, optionsNav, handleSelectionChange } =
    useGenrenceInfoproduct();
  
  const location = useLocation();
  const navigate = useNavigate();
  const section = location.state?.section;
  const [selectedTab, setSelectedTab] = useState("informations");
  
  useEffect(() => {
    if (section || location.state) {
      setSelectedTab(section || location.state);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [section, navigate, location.pathname]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    handleSelectionChange(value);
  };


  return (
    <VStack w="100%" align="flex-start" px={8}>
      <TitlePage title={product?.name || "Carregando..."} />
      <VStack w="100%" gap="32px">
        <HStack w="100%">
          <NavOptions value={section} options={optionsNav} onChange={handleTabChange} />
          {selectedTab === "modules" && (
            <Flex alignSelf="flex-end">
              <ModalCreateModule />
            </Flex>
          )}
        </HStack>
        {selectedTab === "informations" && <Informations data={product} />}
        {selectedTab === "modules" && <Modules data={product} />}
        {selectedTab === "certificates" && <Certificates />}
      </VStack>
    </VStack>
  );
};

export default GenrenceInfoproduct;
