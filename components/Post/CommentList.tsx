import { formatTimeAgo } from '@/lib/utils';
import React from 'react';
import type { Comment } from '@/types';

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <>
            <div className='mt-4 space-y-3 max-sm:space-y-0'>
                {comments.map((comment) => (
                    <div key={comment.id} className='flex gap-2'>
                        <a href={`/profile/${comment.user.id}`}>
                            <img
                                src={
                                    comment.user.profilePicture ||
                                    '/default-avatar.png'
                                }
                                className='w-12 rounded-full max-sm:max-w-[30px]'
                            />
                        </a>
                        <div className='text-sm'>
                            <a href={`/profile/${comment.user.id}`}>
                                <strong>{comment.user.username}</strong>
                            </a>
                            <p>{comment.content}</p>
                            <small className='text-xs text-gray-500'>
                                {formatTimeAgo(comment.createdAt)}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentList;
