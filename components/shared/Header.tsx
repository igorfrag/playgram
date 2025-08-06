'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { logoutUser } from '@/lib/api';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const { user, isAuthenticated } = useAuth();
    const pathname = usePathname();

    if (pathname === '/' && !isAuthenticated) {
        return <></>;
    }

    return (
        <div className='mx-auto flex max-h-14 max-w-5xl items-center justify-between rounded-none border-0 py-4 shadow-none max-lg:px-5'>
            <a href='/'>
                <div className='h-full'>Logo</div>
            </a>
            {isAuthenticated ? (
                <div className='flex h-full gap-5'>
                    <Button
                        className='cursor-pointer'
                        variant={'destructive'}
                        onClick={() => {
                            logoutUser();
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>
                    <a href={`/profile/${user?.id}`}>
                        <Button className='cursor-pointer' variant={'outline'}>
                            Profile
                        </Button>
                    </a>
                    <a href={`/post/new`}>
                        <Button className='cursor-pointer'>New Post</Button>
                    </a>
                </div>
            ) : (
                <div className='h-full'>
                    <a href={'/login'}>
                        <Button className='cursor-pointer'>Login</Button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Header;
