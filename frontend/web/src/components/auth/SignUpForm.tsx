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
    employeeNumber: z.string().min(2, {
        message: "Employee number must be at least 2 characters",
    }),
    fullName: z.string().min(1, {
        message: "Full name is required",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
})

export default function SignUpForm() {
    const [error, setError] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            employeeNumber: "",
            fullName: "",
            password: "",
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!form.watch("employeeNumber") || !form.watch("fullName") || !form.watch("password")) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        alert('Success!');
    };

    return (
        <div className="flex flex-col items-center w-[274px] max-w-sm gap-y-4">
            <span className='text-2xl font-bold mt-4'>Login</span>
            <Form {...form}>
                <form className="w-full flex flex-col gap-y-4" onSubmit={handleSubmit}>
                    <FormField
                        control={form.control}
                        name="employeeNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Employee Number" type='text' className='input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Full Name" type='text' className='input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Password" type='password' className='input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant='default' className='text-primary h-12 rounded-lg bg-muted hover:bg-muted cursor-not-allowed'>Sign Up</Button>
                </form>
            </Form>
            <span className='w-full text-left text-sm mt-2 text-[#002020]'>Already have an account?</span>
        </div>
    );
}