'use client';
import React from 'react';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Comment } from '@/types';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentDrawerProps {
    postId: number;
    comments: Comment[];
    onCommentPosted: () => void;
    isOpen: boolean;
    onClose: () => void;
    onCommentLike: (commentId: number) => void;
    hasMore: boolean;
    loadingComments: boolean;
    fetchMore: () => void;
    addPaginatedComment: (comment: any) => void;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({
    postId,
    comments,
    onCommentPosted,
    onClose,
    isOpen,
    onCommentLike,
    hasMore,
    loadingComments,
    fetchMore,
    addPaginatedComment,
}) => {
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const bottomReached = scrollTop + clientHeight >= scrollHeight - 50;
        if (bottomReached && hasMore && !loadingComments) {
            fetchMore();
        }
    };

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent className='flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-lg'>
                <DrawerTitle className='mx-auto mt-4'>Comments</DrawerTitle>

                <ScrollArea className='flex-1 px-4'>
                    <div
                        className='flex max-h-[55vh] flex-col gap-2 overflow-y-auto'
                        onScroll={handleScroll}
                    >
                        <CommentList
                            className='max-w-5xl p-2'
                            comments={comments}
                            onCommentLike={onCommentLike}
                        />

                        {loadingComments && (
                            <p className='text-muted-foreground p-3 text-center text-sm'>
                                Loading comments...
                            </p>
                        )}
                    </div>
                    <ScrollBar orientation='vertical' />
                </ScrollArea>

                <CommentForm
                    postId={postId}
                    onCommentPosted={(newComment) => {
                        onCommentPosted();
                        addPaginatedComment(newComment);
                    }}
                />
            </DrawerContent>
        </Drawer>
    );
};

export default CommentDrawer;
