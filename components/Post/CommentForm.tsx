'use client';
import { createCommentOnPost } from '@/lib/api';
import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface CommentFormProps {
    postId: number;
    onCommentPosted: () => void;
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
            await createCommentOnPost(postId, content);
            setContent('');
            onCommentPosted();
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
            <Textarea
                className='w-full rounded border p-2 text-sm'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='What do you think of this? '
                rows={2}
            />
            <Button
                type='submit'
                disabled={loading}
                className='rounded bg-black px-4 py-1.5 text-white hover:opacity-80 disabled:opacity-50'
            >
                {loading ? 'Posting...' : 'Comment'}
            </Button>
        </form>
    );
};

export default CommentForm;
