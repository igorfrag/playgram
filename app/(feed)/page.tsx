'use client';
import { useAuth } from '@/context/AuthContext';

import FeedContainer from '../(feed)/FeedContainer';
import LoginContainer from '../(login)/LoginContainer';

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <></>;
    }

    return isAuthenticated ? <FeedContainer /> : <LoginContainer />;
}
