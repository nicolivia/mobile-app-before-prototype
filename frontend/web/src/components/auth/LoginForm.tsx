"use client";

import { useState, FormEvent } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Employee number must be 10 characters",
    }),
})

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('please fill all');
            return;
        }
        setError('');
        alert('success！');
    };

    return (
        <div className="flex flex-col items-center w-[274px] max-w-sm gap-y-4">
            <span className='text-2xl font-bold mt-4'>Login</span>
            <Form {...form}>
                <form className="w-full flex flex-col gap-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Employee number" type='text' className='input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormControl>
                            <Input
                                placeholder="Password"
                                type='password'
                                className='input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                    </FormItem>
                    <span className='text-sm text-right w-full mb-6 cursor-pointer text-impact hover:impact/80'>Forget Password?</span>
                    <Button variant='default' className='text-primary h-12 rounded-lg bg-muted hover:bg-muted cursor-not-allowed'>Login</Button>
                </form>
            </Form>
            <span className='w-full text-left text-sm mt-2 text-[#002020]'>Don’t have an account? <a href="/signup" className='underline text-impact hover:impact/80'>Sign up</a></span>
        </div>
    );
}