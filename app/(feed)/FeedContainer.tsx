'use client';
import React, { useState, useEffect } from 'react';
import { Post as PostType, getUserFeed } from '@/lib/api';
import PostContainer from '@/components/Post/PostContainer';

interface FeedContainerProps {}

const FeedContainer: React.FC<FeedContainerProps> = ({}) => {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const data = await getUserFeed();
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!posts) return <p>Failed to fetch Feed</p>;

    return (
        <>
            {posts.map((post, index) => {
                return <PostContainer postId={post.id} key={index} />;
            })}
        </>
    );
};

export default FeedContainer;
