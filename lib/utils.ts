import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string) {
    const now = new Date();
    const past = new Date(dateString);

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'agora mesmo';

    if (minutes < 60)
        return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;

    if (hours < 24) return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;

    if (days === 1) return 'ontem';

    if (days < 30) return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;

    if (months < 12) return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;

    return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}
