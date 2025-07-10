import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SignupFormProps = {
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SignupForm({ setIsRegistering }: SignupFormProps) {
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
                    <form>
                        <div className='flex flex-col gap-6'>
                            <div className='grid gap-3'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    id='username '
                                    type='text'
                                    placeholder='Username'
                                    required
                                />
                            </div>
                            <div className='grid gap-3'>
                                <div className='items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                </div>
                                <Input id='password' type='password' required />
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
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Button type='submit' className='w-full'>
                                    Login
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
