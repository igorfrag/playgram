'use client';
import { LoginForm } from '@/components/login-form';
import { SignupForm } from '@/components/signup-form';
import { useState } from 'react';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

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
