'use client';
import { Card, CardContent } from '@/components/ui/card';
import NewPostForm from '../NewPostForm';

export default function NewPostPage() {
    return (
        <div className='mx-auto flex h-fit w-full max-w-5xl flex-col items-center'>
            <Card className='w-full'>
                <CardContent>
                    <NewPostForm />
                </CardContent>
            </Card>
        </div>
    );
}
