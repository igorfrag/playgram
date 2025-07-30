'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const { user, isAuthenticated } = useAuth();
    return (
        <div className='mx-auto flex max-h-14 max-w-5xl items-center justify-between rounded-none border-0 py-4 shadow-none max-lg:px-5'>
            <a href='/'>
                <div className='h-full'>Logo</div>
            </a>
            {isAuthenticated ? (
                <div className='flex h-full gap-5'>
                    <a href={`/profile/${user?.id}`}>
                        <Button className='' variant={'outline'}>
                            Profile
                        </Button>
                    </a>
                    <a href={`/post/new`}>
                        <Button className=''>New Post</Button>
                    </a>
                </div>
            ) : (
                <div className='h-full'>
                    <a href={'/login'}>
                        <Button className=''>Login</Button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Header;
