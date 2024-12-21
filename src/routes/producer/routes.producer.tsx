import React from "react";
import { Outlet, Route } from "react-router-dom";
import { Root } from "components/root/root";
import Dashboard from "pages/producer/dashboard";
import { AuthGuard } from "routes/auth/AuthGuard";
import AuthProducer from "pages/producer/auth";
import Infoproducts from "pages/producer/Infoproducts";
import Tickets from "pages/producer/tickets";
import Areas from "pages/producer/areas";
import Members from "pages/producer/members";
import Integrations from "pages/producer/integrations";
import CareateProduct from "pages/producer/Infoproducts/create/create.product";

const LayoutWithRoot: React.FC = () => (
  <Root>
    <Outlet />
  </Root>
);

const ProducerRoutes = () => (
  <>
    <Route element={<AuthGuard isPrivate={false} />}>
      <Route path="/login" element={<AuthProducer />} />
      <Route element={<LayoutWithRoot />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/infoproducts" element={<Infoproducts />} />
        <Route path="/infoproducts/create" element={<CareateProduct />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/members" element={<Members />} />
        <Route path="/integrations" element={<Integrations />} />
      </Route>
    </Route>
  </>
);

export default ProducerRoutes;
