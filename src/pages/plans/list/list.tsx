import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

export const planDetails = [
    {
        planName: 'FREE',
        price: 0,
        installmentInfo: '',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Limite de 10 aulas' },
            { icon: CheckCircleOutlineIcon, text: 'Suporte básico' },
            { icon: CheckCircleOutlineIcon, text: '1 área de membros' },
            { icon: ClearIcon, text: 'Domínios personalizados' },
        ],
        additionalInfo: ['Até 20 alunos', '1 área de membros'],
        planType: 'Free',
        onClick: 'visitor'
    },
    {
        planName: 'Starter',
        price: 297000,
        installmentInfo: 'ou 12x de R$297',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Aulas ilimitadas' },
            { icon: CheckCircleOutlineIcon, text: 'Domínios personalizados' },
            { icon: CheckCircleOutlineIcon, text: 'Upload ilimitado de anexos' },
            { icon: CheckCircleOutlineIcon, text: 'Até 50 cursos por área' },
        ],
        additionalInfo: ['Até 1.000 alunos', '1 área de membros'],
        planType: 'Starter',
        onClick: 'basic'
    },
    {
        planName: 'Pro',
        price: 497000,
        installmentInfo: 'ou 12x de R$497',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Aulas ilimitadas' },
            { icon: CheckCircleOutlineIcon, text: 'Domínios personalizados' },
            { icon: CheckCircleOutlineIcon, text: 'Suporte prioritário' },
            { icon: CheckCircleOutlineIcon, text: 'Até 100 cursos por área' },
        ],
        additionalInfo: ['Até 2.000 alunos', '3 áreas de membros'],
        planType: 'Pro',
        onClick: 'pro'
    },
    {
        planName: 'Premium',
        price: 797000,
        installmentInfo: 'ou 12x de R$797',
        features: [
            { icon: CheckCircleOutlineIcon, text: 'Aulas ilimitadas' },
            { icon: CheckCircleOutlineIcon, text: 'Domínios personalizados' },
            { icon: CheckCircleOutlineIcon, text: 'Suporte dedicado' },
            { icon: CheckCircleOutlineIcon, text: 'Cursos ilimitados' },
        ],
        additionalInfo: ['Alunos ilimitados', 'Áreas de membros ilimitadas'],
        planType: 'Premium',
        onClick: 'bigger'
    }
];
