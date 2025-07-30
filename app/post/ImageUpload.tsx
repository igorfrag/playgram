import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    onFileSelect: (file: File, previewUrl: string) => void;
}

export function ImageUpload({ onFileSelect }: ImageUploadProps) {
    return (
        <div className='flex w-full items-center justify-center'>
            <Label
                htmlFor='image-upload'
                className={cn(
                    'flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
                    'text-foreground text-sm transition'
                )}
            >
                <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                    <img
                        src={'/post/arrow-up.svg'}
                        className='max-w-1/10 mb-3'
                    />
                    <p className='mb-2 text-sm font-semibold'>
                        Upload your picture
                    </p>
                    <p className='text-xs'>
                        Supported Formats: PNG, JPG or JPEG
                    </p>
                </div>
                <input
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            onFileSelect(file, previewUrl);
                        }
                    }}
                />
            </Label>
        </div>
    );
}
