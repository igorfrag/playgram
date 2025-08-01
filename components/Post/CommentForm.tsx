'use client';
import { createCommentOnPost } from '@/lib/api';
import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { SendHorizonal } from 'lucide-react';
import { Button } from '../ui/button';
import { Comment } from '@/types';

interface CommentFormProps {
    postId: number;
    onCommentPosted: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
    postId,
    onCommentPosted,
}) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            const data = await createCommentOnPost(postId, content);
            setContent('');
            onCommentPosted(data);
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
            <div className='flex w-full items-end'>
                <Textarea
                    className='max-h-[40px] min-h-[40px] flex-1 resize-none rounded border-t-2 p-2 text-sm'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='What do you think of this? '
                    rows={2}
                    maxLength={160}
                />
                <Button
                    type='submit'
                    disabled={loading}
                    className='max-h-[40px] min-h-[40px] rounded bg-black px-4 py-1.5 text-white hover:opacity-80 disabled:opacity-50'
                >
                    {loading ? 'Posting...' : <SendHorizonal />}
                </Button>
            </div>
        </form>
    );
};

export default CommentForm;
