import React, { ReactNode } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';

interface PostProps {
    children: ReactNode;
    username?: string;
    guildname?: string;
}

const Post: React.FC<PostProps> = ({
    children,
    username = 'Username',
    guildname = 'Guildname',
}) => {
    return (
        <Card className='w-3/4'>
            <CardHeader>
                <div className='flex items-center gap-4'>
                    <img
                        width={50}
                        height={50}
                        src={'https://avatar.iran.liara.run/public/17'}
                    ></img>
                    <CardTitle>{username}</CardTitle>
                    <CardDescription>{guildname}</CardDescription>
                </div>

                <CardAction>
                    <Button>Follow</Button>
                </CardAction>
            </CardHeader>
            <CardContent className='w-full aspect-square overflow-hidden'>
                <img
                    src={'/tibia.png'}
                    alt='Post'
                    className='w-full h-full object-cover'
                />
            </CardContent>

            <CardContent>
                <p>
                    <span className='font-bold'>
                        {username} [{guildname}]
                    </span>{' '}
                    {children}
                </p>
            </CardContent>

            <CardFooter>
                <p>4 hours ago</p>
            </CardFooter>
        </Card>
    );
};

export default Post;
