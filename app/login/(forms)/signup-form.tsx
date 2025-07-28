'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { registerUser, loginUser } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SignupFormProps = {
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SignupForm({ setIsRegistering }: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const data = await registerUser(
                email,
                username,
                fullName,
                password
            );

            if (!data) throw new Error('Registration failed');
            const loginData = await loginUser(email, password);
            if (!loginData) {
                throw new Error('Login failed');
            }
            router.push('/');
        } catch (err) {
            setError('Internal server error');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6')}>
            <h1 className='mb-4 text-center text-2xl font-bold'>Playgram!</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Register a new Account</CardTitle>
                    <CardDescription>
                        Enter your email below to sign up for a new account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-6'>
                            <div className='grid gap-3'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='email@example.com'
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    id='username'
                                    type='text'
                                    placeholder='Username'
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <Label htmlFor='fullname'>Full Name</Label>
                                <Input
                                    id='fullname'
                                    type='text'
                                    placeholder='Full Name'
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <div className='items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='grid gap-3'>
                                <div className='items-center'>
                                    <Label htmlFor='confirm-password'>
                                        Confirm Password
                                    </Label>
                                </div>
                                <Input
                                    id='confirm-password'
                                    type='password'
                                    onChange={(e) => {
                                        setPasswordConfirm(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Button
                                    type='submit'
                                    className='w-full cursor-pointer'
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Have an account?{' '}
                            <a
                                href='#'
                                className='underline underline-offset-4'
                                onClick={() => setIsRegistering(false)}
                            >
                                Log in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
