'use client';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './ImageUpload';
import { createNewPost } from '@/lib/api';
import { useRouter } from 'next/navigation';

const NewPostForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async () => {
        if (!image || !caption) {
            alert('Image/Description required');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        try {
            const data = await createNewPost(caption, image);
            console.log('Post criado com sucesso:', data);
            router.push(`/post/${data.id}`);
        } catch (error) {
            console.error('Erro ao criar post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mx-auto max-w-xl space-y-4'>
            {!previewUrl && (
                <ImageUpload
                    onFileSelect={(selectedFile, url) => {
                        setImage(selectedFile);
                        setPreviewUrl(url);
                    }}
                />
            )}

            {previewUrl && (
                <div>
                    <img
                        src={previewUrl!}
                        alt='Preview'
                        className='h-auto w-full rounded-lg border'
                    />
                    <Button
                        variant='outline'
                        type='button'
                        className='mt-2 w-full'
                        onClick={handleRemoveImage}
                    >
                        Remover imagem
                    </Button>
                </div>
            )}

            <Textarea
                placeholder='Type your description'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Uploading...' : 'Post !'}
            </Button>
        </div>
    );
};

export default NewPostForm;
