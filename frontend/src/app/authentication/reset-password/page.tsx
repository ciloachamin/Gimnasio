"use client";
import { FC } from 'react';
import { TextInput, Label, Checkbox, Button, Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

const ResetPassword: FC = function () {
    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <Link href="/" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <Image
                    alt="Flowbite logo"
                    height="24"
                    src="/../favicon.png"
                    width="24"
                    style={{ width: '100%', height: '100%' }}
                />
                <span>Flowbite</span>
            </Link>
            {/* Card */}
            <Card
                horizontal
                imgAlt=""
                className="w-full max-w-xl md:flex-col-reverse  p-6 space-y-8 bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800"
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Reset your password
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <Label htmlFor="email">Your email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            type="email"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">New password</Label>
                        <TextInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <TextInput
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="••••••••"
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <Checkbox
                            id="remember"
                            aria-describedby="remember"
                            name="remember"
                            required
                        />
                        <Label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">
                        &nbsp; I accept the <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">Terms and Conditions</a>
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full  text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Reset password
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;
