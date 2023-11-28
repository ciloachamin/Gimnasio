"use client";
import React from 'react';
import {
    Button,
    Checkbox,
    Label,
    TextInput,
} from "flowbite-react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const LoginForm: React.FC = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const [email, setEmail] = useState("string@hotmail.com");
    const [password, setPassword] = useState("string");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            setErrors(responseNextAuth.error.split(","));
            return;
        }

        router.push("/dashboard");
    };







    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0  dark:bg-gray-900"  >
            <a href="/" className="flex items-center justify-center mb-8 text-5xl font-semibold lg:mb-7 dark:text-white">
                <Image
                    alt="Flowbite logo"
                    height="0"
                    src="https://flowbite.com/docs/images/logo.svg"
                    width="0"
                    style={{ width: '100%', height: '100%' }}

                />

                <span>Flowbite</span>
            </a>
            {/* Card */}
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email" >
                            Your email
                        </Label>
                        <TextInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@company.com"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>



                    <div>
                        <Label htmlFor="password" >
                            Your password
                        </Label>
                        <TextInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••" required
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Checkbox
                                    id="remember"
                                    aria-describedby="remember"
                                    name="remember"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <Label htmlFor="remember">
                                    Remember me
                                </Label>
                            </div>
                        </div>
                        <a href="#" className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">
                            Lost Password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                    >
                        Login to your account
                    </Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Not registered?{' '}
                        <a className="text-primary-700 hover:underline dark:text-primary-500">Create account</a>
                    </div>
                </form>
                {errors.length > 0 && (
                    <div className="alert alert-danger mt-2">
                        <ul className="mb-0">
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
