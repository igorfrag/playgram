'use client';
import { LoginForm } from '@/app/login/(forms)/login-form';
import { SignupForm } from '@/app/login/(forms)/signup-form';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const { isAuthenticated, isLoading } = useAuth();
    console.log(isAuthenticated);
    const router = useRouter();
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || isAuthenticated) {
        return null;
    }
    return (
        <div className='mx-auto flex min-h-svh max-w-5xl items-center justify-evenly'>
            <div className='max-lg:hidden'>
                <img src={'/logo.png'} alt='Playgram! Logo' />
            </div>
            <div className='w-full max-w-sm'>
                {isRegistering ? (
                    <SignupForm setIsRegistering={setIsRegistering} />
                ) : (
                    <LoginForm setIsRegistering={setIsRegistering} />
                )}
            </div>
        </div>
    );
}
