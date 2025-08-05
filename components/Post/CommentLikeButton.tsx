'use client';

import { Heart } from 'lucide-react';

type CommentLikeButtonProps = {
    isLiked: boolean;
    likesCount: number;
    onCommentLike: () => void;
};

export function CommentLikeButton({
    isLiked,
    likesCount,
    onCommentLike,
}: CommentLikeButtonProps) {
    return (
        <div className='mt-2 flex items-center gap-2'>
            <Heart
                className={`h-4 w-4 cursor-pointer ${isLiked ? 'stroke-foreground fill-foreground' : 'stroke-foreground fill-background'}`}
                onClick={onCommentLike}
            />
            <span className='text-muted-foreground text-sm'>{likesCount}</span>
        </div>
    );
}
