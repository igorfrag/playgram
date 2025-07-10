'use client';
import { LoginForm } from '@/components/login-form';
import { SignupForm } from '@/components/signup-form';
import { useState } from 'react';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className='flex min-h-svh w-full items-center justify-evenly p-6 md:p-10'>
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
