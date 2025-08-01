import { getCommentsByPostId } from '@/lib/api';
import { Comment } from '@/types';
import { useEffect, useState } from 'react';

const usePaginatedComments = (postId: number) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const take = 10;
    const skip = page * take;

    const fetchComments = async () => {
        if (loading || !hasMore || !postId) return;
        setLoading(true);

        const data = await getCommentsByPostId(postId, skip, take);
        if (data.length > 0) {
            setComments((prev) => {
                const existingIds = new Set(prev.map((c) => c.id));
                const filteredNew = data.filter(
                    (c: any) => !existingIds.has(c.id)
                );
                return [...prev, ...filteredNew];
            });
            setHasMore(data.length === take);
            setPage((prev) => prev + 1);
        }
        setLoading(false);
    };

    const addComment = (comment: Comment) => {
        setComments((prev) => [comment, ...prev]);
    };

    useEffect(() => {
        if (!postId) return;
        fetchComments();
    }, [postId]);

    return { comments, loading, fetchComments, hasMore, addComment };
};

export default usePaginatedComments;
