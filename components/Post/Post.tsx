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
import { Heart } from 'lucide-react';
import CommentDrawer from './CommentDrawer';
import { Drawer, DrawerTrigger } from '../ui/drawer';

interface PostProps {
    post: PostType;
    guildname?: string;
    previewComments: Comment[];
    paginatedComments: Comment[];
    isLiked: boolean;
    likesCount: number;
    onCommentPosted: () => void;
    onDoubleClick: () => void;
    onLike: () => void;
    onCommentLike: (commentId: number) => void;
    showLikeAnimation: boolean;
    hasMore: boolean;
    fetchMore: () => void;
    loadingComments: boolean;
    addPaginatedComment: (comment: Comment) => void;
}

const Post: React.FC<PostProps> = ({
    post,
    guildname = 'Guild',
    previewComments,
    onCommentPosted,
    onDoubleClick,
    isLiked,
    likesCount,
    onLike,
    showLikeAnimation,
    onCommentLike,
    hasMore,
    fetchMore,
    loadingComments,
    paginatedComments,
    addPaginatedComment,
}) => {
    const { id, user, caption, imageUrl, createdAt, commentsCount } = post;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

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
            <CardContent
                className='relative aspect-square w-full touch-none select-none overflow-hidden max-sm:px-0'
                onDoubleClick={onDoubleClick}
            >
                <img
                    src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                    alt='Post'
                    className='h-full w-full object-cover'
                />
                {showLikeAnimation && (
                    <div className='-translate-1/2 pointer-events-none absolute inset-0 left-1/2 top-1/2 flex items-center justify-center'>
                        <Heart
                            className='aspect-square animate-ping fill-white stroke-white duration-500'
                            size={100}
                        />
                    </div>
                )}
            </CardContent>
            <CardContent className='max-sm: flex items-center justify-center gap-5'>
                <LikeButton
                    isLiked={isLiked}
                    likesCount={likesCount}
                    onLike={onLike}
                />
                <CommentButton
                    postId={id}
                    commentsCount={commentsCount}
                    onToggle={openDrawer}
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
            <CardContent className='max-sm:px-2'>
                <CommentList
                    comments={previewComments}
                    onCommentLike={onCommentLike}
                />
                <Drawer>
                    <DrawerTrigger asChild>
                        <span
                            onClick={() => setDrawerOpen(true)}
                            className='cursor-pointer'
                        >
                            {commentsCount > 0
                                ? 'See all comments'
                                : 'Be the first to comment'}
                        </span>
                    </DrawerTrigger>

                    <CommentDrawer
                        postId={id}
                        onCommentPosted={onCommentPosted}
                        isOpen={drawerOpen}
                        onClose={closeDrawer}
                        onCommentLike={onCommentLike}
                        hasMore={hasMore}
                        fetchMore={fetchMore}
                        loadingComments={loadingComments}
                        comments={paginatedComments}
                        addPaginatedComment={addPaginatedComment}
                    />
                </Drawer>
            </CardContent>

            <CardFooter>
                <p className='text-gray-500'>{formatTimeAgo(createdAt)}</p>
            </CardFooter>
        </Card>
    );
};

export default Post;
