"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button, Card, Label, TextInput, Checkbox } from 'flowbite-react';

const ForgotPassword = () => {

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <Link href={"/"} className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
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
        className="w-full max-w-md  md:max-w-md space-y-8 bg-white rounded-lg shadow  dark:bg-gray-800"
      >
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            Forgot your password?
          </h2>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Don't fret! Just type in your email and we will send you a code to reset your password!
          </p>
          <form className="mt-8 space-y-6" action="#">
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </Label>
              <TextInput
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="flex items-start">

              <Checkbox
                id="remember"
                aria-describedby="remember"
                name="remember"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <div className="ml-3 text-sm">
                <Label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">
                  I accept the <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">Terms and Conditions</a>
                </Label>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full  text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </Button>
          </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
