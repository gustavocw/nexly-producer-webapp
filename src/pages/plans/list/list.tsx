import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

export const planDetails = [
    {
        planName: 'FREE',
        price: 0,
        installmentInfo: 'Grátis',
        features: [
            { icon: CheckCircleOutlineIcon, text: '1 área de membros' },
            { icon: CheckCircleOutlineIcon, text: '1 info produto (até 10 módulos)' },
            { icon: CheckCircleOutlineIcon, text: 'Vídeos via YouTube e Vimeo' },
            { icon: CheckCircleOutlineIcon, text: 'Webhook Hotmart básico' },
            { icon: ClearIcon, text: 'Sem hospedagem de vídeos' },
            { icon: ClearIcon, text: 'Sem integração em massa' },
            { icon: ClearIcon, text: 'Sem domínio personalizado' },
        ],
        additionalInfo: ['Vídeo aulas e ebooks', 'Sem limite de alunos'],
        planType: 'Free',
        onClick: 'visitor'
    },
    {
        planName: 'Starter',
        price: 96000, // R$ 960,00 (plano anual)
        installmentInfo: 'R$ 100/mês ou R$ 960/ano',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Domínio personalizado' },
            { icon: CheckCircleOutlineIcon, text: '1 área de membros' },
            { icon: CheckCircleOutlineIcon, text: 'Até 2 info produtos' },
            { icon: CheckCircleOutlineIcon, text: 'Módulos e vídeos ilimitados' },
            { icon: CheckCircleOutlineIcon, text: 'Hospedagem de vídeos' },
            { icon: CheckCircleOutlineIcon, text: 'Integração YouTube, Vimeo, Hotmart' },
        ],
        additionalInfo: ['Até 2.000 alunos', 'Vídeo aulas, ebooks, lives'],
        planType: 'Starter',
        onClick: 'basic'
    },
    {
        planName: 'Pro',
        price: 288000, // R$ 2.880,00 (plano anual)
        installmentInfo: 'R$ 300/mês ou R$ 2.880/ano',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Domínio personalizado' },
            { icon: CheckCircleOutlineIcon, text: '2 áreas de membros' },
            { icon: CheckCircleOutlineIcon, text: 'Info produtos ilimitados' },
            { icon: CheckCircleOutlineIcon, text: 'Módulos e vídeos ilimitados' },
            { icon: CheckCircleOutlineIcon, text: 'Hospedagem de vídeos' },
            { icon: CheckCircleOutlineIcon, text: 'Integração completa' },
            { icon: CheckCircleOutlineIcon, text: 'Integração em massa' },
            { icon: CheckCircleOutlineIcon, text: 'Suporte prioritário' },
        ],
        additionalInfo: ['Até 7.000 alunos', 'Vídeo aulas, ebooks, lives'],
        planType: 'Pro',
        onClick: 'pro'
    },
    {
        planName: 'Premium',
        price: 768000, // R$ 7.680,00 (plano anual)
        installmentInfo: 'R$ 800/mês ou R$ 7.680/ano',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Domínio personalizado' },
            { icon: CheckCircleOutlineIcon, text: '3 áreas de membros' },
            { icon: CheckCircleOutlineIcon, text: 'Info produtos ilimitados' },
            { icon: CheckCircleOutlineIcon, text: 'Módulos e vídeos ilimitados' },
            { icon: CheckCircleOutlineIcon, text: 'Hospedagem de vídeos' },
            { icon: CheckCircleOutlineIcon, text: 'Integração completa' },
            { icon: CheckCircleOutlineIcon, text: 'Integração em massa' },
            { icon: CheckCircleOutlineIcon, text: 'Suporte VIP' },
            { icon: CheckCircleOutlineIcon, text: 'Automação avançada' },
            { icon: CheckCircleOutlineIcon, text: 'Certificados personalizados' },
            { icon: CheckCircleOutlineIcon, text: 'Relatórios avançados' },
        ],
        additionalInfo: ['Até 30.000 alunos', 'Vídeo aulas, ebooks, lives'],
        planType: 'Premium',
        onClick: 'bigger'
    }
];