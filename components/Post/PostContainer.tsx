'use client';

import { useEffect, useState } from 'react';
import { getCommentsByPostId, getPostById, togglePostLike } from '@/lib/api';
import type { Comment, Post as PostType } from '@/types';
import Post from '@/components/Post/Post';

const PostContainer = ({ postId }: { postId: number }) => {
    const [post, setPost] = useState<PostType | null>(null);
    const [previewComments, setPreviewComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(post?.isLiked || false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);

    const fetchPost = async () => {
        try {
            const data = await getPostById(postId);
            setPost(data);
            setLiked(data.isLiked);
            setLikesCount(data.likesCount);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPreviewComments = async () => {
        try {
            const data = await getCommentsByPostId(postId, 0, 2);
            setPreviewComments(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCommentPosted = async () => {
        setPost((prev) =>
            prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : prev
        );
        fetchPreviewComments();
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
            await fetchPreviewComments();
            setLoading(false);
        };
        fetchData();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <Post
            post={post}
            comments={previewComments}
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
