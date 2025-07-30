'use client';
import PostContainer from '@/components/Post/PostContainer';
import { useParams } from 'next/navigation';

export default function PostPage() {
    const params = useParams();
    const postId = Number(params?.id);

    return (
        <div className='mx-auto flex h-fit w-full max-w-5xl flex-col items-center'>
            <PostContainer postId={postId} />
        </div>
    );
}
