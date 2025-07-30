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
import { formatTimeAgo } from '@/lib/utils';
import type { Post as PostType } from '@/lib/api';
import { LikeButton } from './LikeButton';
import CommentList from './CommentList';

interface PostProps {
    post: PostType;
    guildname?: string;
}

const Post: React.FC<PostProps> = ({ post, guildname = 'Guild' }) => {
    const {
        id,
        user,
        caption,
        imageUrl,
        createdAt,
        commentsCount,
        likesCount,
        isLiked,
    } = post;

    return (
        <Card className='w-3/4'>
            <CardHeader>
                <div className='flex items-center gap-4'>
                    <a href={`/profile/${user.id}`}>
                        <img
                            className='rounded-full'
                            width={50}
                            height={50}
                            src={user.profilePicture || '/user/avatar.jpg'}
                        ></img>
                    </a>
                    <a href={`/profile/${user.id}`}>
                        <CardTitle>{user.username}</CardTitle>
                    </a>
                    <CardDescription>{guildname}</CardDescription>
                </div>

                <CardAction>
                    <Button>Follow</Button>
                </CardAction>
            </CardHeader>
            <CardContent className='aspect-square w-full overflow-hidden'>
                <img
                    src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                    alt='Post'
                    className='h-full w-full object-cover'
                />
            </CardContent>
            <CardContent>
                <LikeButton
                    postId={id}
                    isLiked={isLiked}
                    likesCount={likesCount}
                />
            </CardContent>

            <CardContent>
                <p>
                    <span className='font-bold'>
                        {user.username} [{guildname}]
                    </span>{' '}
                    {caption}
                </p>
            </CardContent>
            <CardContent>
                <CommentList postId={id} />
            </CardContent>

            <CardFooter>
                <p>{formatTimeAgo(createdAt)}</p>
            </CardFooter>
        </Card>
    );
};

export default Post;
