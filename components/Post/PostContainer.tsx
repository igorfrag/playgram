'use client';

import { useEffect, useState } from 'react';
import { getCommentsByPostId, getPostById } from '@/lib/api';
import type { Comment, Post as PostType } from '@/types';
import Post from '@/components/Post/Post';

const PostContainer = ({ postId }: { postId: number }) => {
    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const data = await getPostById(postId);
            setPost(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const data = await getCommentsByPostId(postId);
            setComments(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCommentPosted = async () => {
        await fetchComments();
    };
    useEffect(() => {
        const fetchData = async () => {
            await fetchPost();
            await fetchComments();
            setLoading(false);
        };
        fetchData();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <Post
            post={post}
            comments={comments}
            onCommentPosted={handleCommentPosted}
        />
    );
};

export default PostContainer;
