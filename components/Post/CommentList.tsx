import { formatTimeAgo } from '@/lib/utils';
import React from 'react';
import type { Comment } from '@/types';
import { CommentLikeButton } from './CommentLikeButton';

interface CommentListProps {
    comments: Comment[];
    className?: string;
    onCommentLike: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    className,
    onCommentLike,
}) => {
    return (
        <>
            <div className={`mt-4 space-y-3 max-sm:space-y-0 ${className}`}>
                {comments.map((comment) => (
                    <div key={comment.id} className='flex'>
                        <div className='flex gap-2 pb-2'>
                            <a href={`/profile/${comment.user.id}`}>
                                <img
                                    src={
                                        comment.user.profilePicture ||
                                        '/user/avatar.jpg'
                                    }
                                    className='w-12 rounded-full max-sm:max-w-[30px]'
                                />
                            </a>
                            <div className='text-sm'>
                                <a href={`/profile/${comment.user.id}`}>
                                    <strong>{comment.user.username}</strong>
                                </a>
                                <small className='pl-2 text-xs text-gray-500'>
                                    {formatTimeAgo(comment.createdAt)}
                                </small>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                        <div className='ml-auto'>
                            <CommentLikeButton
                                isLiked={comment.isLiked}
                                likesCount={comment.likesCount}
                                onCommentLike={() => onCommentLike(comment.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentList;
