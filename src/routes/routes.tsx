import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Outlet, Route } from "react-router-dom";
import { Root } from "components/root/root";
import Dashboard from "pages/dashboard";
import { AuthGuard } from "routes/auth/AuthGuard";
import AuthProducer from "pages/auth";
import Infoproducts from "pages/Infoproducts";
import Tickets from "pages/tickets";
import Areas from "pages/areas";
import Members from "pages/members";
import Integrations from "pages/integrations";
import CareateProduct from "pages/Infoproducts/create/create.product";
import Platform from "pages/Infoproducts/create/platforms/platform.product";
import YoutubeChannels from "pages/Infoproducts/create/youtube/youtube.channels";
import GenrenceInfoproduct from "pages/Infoproducts/gerence";
import YoutubePlaylists from "pages/Infoproducts/create/youtube/playlists/playlists.youtube";
import YoutubeVideos from "pages/Infoproducts/create/youtube/videos/videos.youtube";
import PreviewVideos from "pages/Infoproducts/create/videoPreview/preview";
import AuthYoutube from "pages/Infoproducts/create/platforms/authplatform/auth.youtube";

const LayoutWithRoot: React.FC = () => (
  <Root>
    <Outlet />
  </Root>
);

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthProducer />} />
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<LayoutWithRoot />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/infoproducts" element={<Infoproducts />} />
            <Route path="/infoproducts/create" element={<CareateProduct />} />
            <Route
              path="/infoproducts/create/platfoms/:id"
              element={<Platform />}
            />
            <Route
              path="/infoproducts/create/youtube"
              element={<YoutubeChannels />}
            />
            <Route
              path="/infoproducts/create/youtube/playlists"
              element={<YoutubePlaylists />}
            />
            <Route
              path="/infoproducts/create/youtube/videos"
              element={<YoutubeVideos />}
            />
            <Route
              path="/infoproducts/create/video/:id"
              element={<PreviewVideos />}
            />
            <Route
              path="/infoproducts/informations/:id"
              element={<GenrenceInfoproduct />}
            />
            <Route path="nexlyauth" element={<AuthYoutube />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/members" element={<Members />} />
            <Route path="/integrations" element={<Integrations />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
