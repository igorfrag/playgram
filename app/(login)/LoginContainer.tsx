import React, { useState } from 'react';
import { SignupForm } from './(forms)/signup-form';
import { LoginForm } from './(forms)/login-form';

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
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
};

export default LoginContainer;
