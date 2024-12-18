import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import UserRoutes from "./user/routes.user";
import ProducerRoutes from "./producer/routes.producer";

const AppRoutes: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        {UserRoutes()}
        {ProducerRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
