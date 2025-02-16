import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import {  Step } from "react-joyride";

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


export const steps: Step[] = [
  {
    target: "body",
    content:
      "Bem-vindo(a) à Nexly Members! Aqui você pode gerenciar seus produtos digitais, membros, integrações e suporte de forma simples e eficiente.",
    placement: "center",
  },
  {
    target: ".menu-",
    content:
      "A Dashboard é o centro de controle da sua plataforma. Aqui você pode visualizar estatísticas, acompanhar métricas importantes, monitorar vendas e o engajamento dos seus usuários.",
    placement: "right",
  },
  {
    target: ".menu-infoproducts",
    content:
      "A seção de Infoprodutos permite que você crie, gerencie e edite cursos digitais. Você pode adicionar vídeos, organizar módulos, configurar preços e disponibilizar conteúdos para os seus alunos.",
    placement: "right",
  },
  {
    target: ".menu-members",
    content:
      "Na seção de Membros, você pode gerenciar usuários cadastrados, definir permissões de acesso, acompanhar o progresso dos alunos e administrar assinaturas.",
    placement: "right",
  },
  {
    target: ".menu-tickets",
    content:
      "A área de Tickets permite que você gerencie o suporte ao cliente. Aqui é possível visualizar, responder e resolver dúvidas ou problemas relatados pelos seus usuários.",
    placement: "right",
  },
  {
    target: ".menu-integrations",
    content:
      "A seção de Integrações permite conectar sua plataforma a serviços externos como Vimeo, YouTube, Hotmart e outras plataformas de venda de cursos, facilitando a automação e o gerenciamento do seu conteúdo.",
    placement: "right",
  },
  {
    target: ".menu-areas",
    content:
      "A Área de Membros permite que você personalize a experiência dos seus alunos. Aqui você pode configurar domínios personalizados, editar o layout da sua plataforma, publicar novos conteúdos e definir regras de acesso.",
    placement: "right",
  },
];