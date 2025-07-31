'use client';

import { useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CommentButtonProps = {
    postId: number;
    commentsCount: number;
    onToggle: () => void;
};

export function CommentButton({
    postId,
    commentsCount,
    onToggle,
}: CommentButtonProps) {
    return (
        <div className='mt-2 flex items-center gap-2'>
            <Button variant={'outline'} size='sm' onClick={onToggle}>
                <MessageCircleMore />
                <span className='ml-1'>Comment</span>
            </Button>
            <span className='text-muted-foreground text-sm'>
                {commentsCount}
            </span>
        </div>
    );
}
