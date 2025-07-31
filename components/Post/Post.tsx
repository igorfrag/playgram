'use client';
import React, { useState } from 'react';
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
import type { Comment, Post as PostType } from '@/types';
import { LikeButton } from './LikeButton';
import CommentList from './CommentList';
import { CommentButton } from './CommentButton';
import CommentForm from './CommentForm';

interface PostProps {
    post: PostType;
    guildname?: string;
    comments: Comment[];
    onCommentPosted: () => void;
}

const Post: React.FC<PostProps> = ({
    post,
    guildname = 'Guild',
    comments,
    onCommentPosted,
}) => {
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

    const [showComments, setShowComments] = useState(false);

    const handleToggleComments = () => {
        setShowComments((prev) => !prev);
    };

    return (
        <Card className='w-3/4 max-sm:w-full max-sm:gap-1 max-sm:rounded-none max-sm:border-0 max-sm:border-t-2'>
            <CardHeader>
                <div className='flex items-center gap-4'>
                    <a href={`/profile/${user.id}`}>
                        <img
                            className='rounded-full max-sm:max-w-[30px]'
                            width={50}
                            height={50}
                            src={user.profilePicture || '/user/avatar.jpg'}
                        ></img>
                    </a>
                    <a href={`/profile/${user.id}`}>
                        <CardTitle>{user.username}</CardTitle>
                    </a>
                    <CardDescription>
                        {guildname ? guildname : ''}
                    </CardDescription>
                </div>

                <CardAction>
                    <Button>Follow</Button>
                </CardAction>
            </CardHeader>
            <CardContent className='aspect-square w-full overflow-hidden max-sm:px-0'>
                <img
                    src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                    alt='Post'
                    className='h-full w-full object-cover'
                />
            </CardContent>
            <CardContent className='max-sm: flex items-center justify-center gap-5'>
                <LikeButton
                    postId={id}
                    isLiked={isLiked}
                    likesCount={likesCount}
                />
                <CommentButton
                    postId={id}
                    commentsCount={comments.length}
                    onToggle={handleToggleComments}
                />
            </CardContent>

            <CardContent className='text-pretty text-left max-sm:px-2 max-sm:pt-2'>
                <p>
                    <span className='font-bold'>
                        {user.username} {guildname ? `[${guildname}]` : ''}
                    </span>{' '}
                    {caption}
                </p>
            </CardContent>
            <CardContent>
                {showComments && (
                    <CommentForm
                        postId={id}
                        onCommentPosted={onCommentPosted}
                    />
                )}
                <CommentList comments={comments} />
            </CardContent>

            <CardFooter>
                <p className='text-gray-500'>{formatTimeAgo(createdAt)}</p>
            </CardFooter>
        </Card>
    );
};

export default Post;
