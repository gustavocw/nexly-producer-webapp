import { Route } from "react-router-dom";
import AuthUser from "pages/user/auth";
import { AuthGuard } from "routes/auth/AuthGuard";
import Home from "pages/user/home";

const UserRoutes = () => (
  <>
    <Route path="/user/login" element={<AuthUser />} />
    <Route element={<AuthGuard isPrivate={true} />}>
      <Route path="/user/home" element={<Home />} />
    </Route>
  </>
);

export default UserRoutes;
