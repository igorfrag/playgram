'use client';

import { useEffect, useState } from 'react';
import { getCommentsByPostId, getPostById, togglePostLike } from '@/lib/api';
import type { Comment, Post as PostType } from '@/types';
import Post from '@/components/Post/Post';

const PostContainer = ({ postId }: { postId: number }) => {
    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(post?.isLiked || false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);

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
    const handleLike = async () => {
        if (!post) return;

        try {
            await togglePostLike(post.id);
            setLiked((prev) => !prev);
            setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
        } catch (error) {
            console.error('Failed to like:', error);
        }
    };

    const handleDoubleClick = () => {
        if (!liked) handleLike();
        setShowLikeAnimation(true);
        setTimeout(() => setShowLikeAnimation(false), 1000);
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
            isLiked={liked}
            likesCount={likesCount}
            onLike={handleLike}
            onDoubleClick={handleDoubleClick}
            showLikeAnimation={showLikeAnimation}
        />
    );
};

export default PostContainer;
