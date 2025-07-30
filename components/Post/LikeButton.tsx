'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { togglePostLike } from '@/lib/api';

type LikeButtonProps = {
    postId: number;
    isLiked: boolean;
    likesCount: number;
};

export function LikeButton({ postId, isLiked, likesCount }: LikeButtonProps) {
    const [liked, setLiked] = useState(isLiked);
    const [count, setCount] = useState(likesCount);
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await togglePostLike(postId);
            setLiked((prev) => !prev);
            setCount((prev) => (liked ? prev - 1 : prev + 1));
        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-2 flex items-center gap-2'>
            <Button
                variant={liked ? 'default' : 'outline'}
                size='sm'
                onClick={handleLike}
                disabled={loading}
            >
                <Heart className={`h-4 w-4 ${liked ? 'fill-white' : ''}`} />
                <span className='ml-1'>{liked ? 'Liked' : 'Like'}</span>
            </Button>
            <span className='text-muted-foreground text-sm'>{count}</span>
        </div>
    );
}
