'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const { user, isAuthenticated } = useAuth();
    return (
        <div className='mx-auto flex max-h-14 max-w-5xl items-center justify-between rounded-none border-0 py-4 shadow-none max-lg:px-5'>
            <div className='h-full'>Logo</div>
            {isAuthenticated ? (
                <div className='h-full'>
                    <a href={`/profile/${user?.id}`}>
                        <Button className='mr-5'>Profile</Button>
                    </a>
                </div>
            ) : (
                <div className='h-full'>
                    <a href={'/login'}>
                        <Button className='mr-5'>Login</Button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Header;
