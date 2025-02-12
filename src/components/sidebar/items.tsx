import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

const isMobile = window.innerWidth <= 768;

export const menuItems = [
  {
    path: "/",
    icon: <DashboardOutlinedIcon />,
    label: "Visão Geral",
  },
  {
    path: "/infoproducts",
    icon: <PlayLessonOutlinedIcon />,
    label: "Produtos",
  },
  { path: "/members", icon: <GroupOutlinedIcon />, label: "Membros" },
  !isMobile && { path: "/tickets", icon: <SupportAgentOutlinedIcon />, label: "Tickets" },
  !isMobile && {
    path: "/integrations",
    icon: <IntegrationInstructionsOutlinedIcon />,
    label: "Integrações",
  },
  {
    path: '/areas',
    icon: <DriveFileRenameOutlineRoundedIcon />,
    label: 'Áreas de membro',
  },
].filter(Boolean);
