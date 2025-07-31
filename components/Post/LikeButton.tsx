'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LikeButtonProps = {
    isLiked: boolean;
    likesCount: number;
    onLike: () => void;
};

export function LikeButton({ isLiked, likesCount, onLike }: LikeButtonProps) {
    return (
        <div className='mt-2 flex items-center gap-2'>
            <Button
                variant={isLiked ? 'default' : 'outline'}
                size='sm'
                onClick={onLike}
            >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-white' : ''}`} />
                <span className='ml-1 max-sm:hidden'>
                    {isLiked ? 'Liked' : 'Like'}
                </span>
            </Button>
            <span className='text-muted-foreground text-sm'>{likesCount}</span>
        </div>
    );
}
