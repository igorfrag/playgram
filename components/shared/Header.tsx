import React from 'react';
import { Button } from '../ui/button';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const baseUrl = process.env.BASE_URL;
    return (
        <div className='mx-auto flex max-h-14 max-w-5xl items-center justify-between rounded-none border-0 py-4 shadow-none max-lg:px-5'>
            <div className='h-full'>Logo</div>
            <div className='h-full'>
                <a href={baseUrl + 'login'}>
                    <Button className='mr-5'>Login</Button>
                </a>
            </div>
        </div>
    );
};

export default Header;
