/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { use, type FC } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const SignUpPage: FC = function () {

  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("string");
  const [lastname, setLastname] = useState<string>("string");
  const [code, setCode] = useState<string>("string");
  const [phone, setPhone] = useState<string>("string");
  const [location, setLocation] = useState<string>("string");
  const [email, setEmail] = useState<string>("hola@hotmail.com");
  const [password, setPassword] = useState<string>("string");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${backendUrl}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mem_id: 1,
          pla_id: 1,
          mem_name: name,
          mem_lastname: lastname,
          mem_code: code,
          mem_phone: phone,
          mem_email: email,
          mem_location: location,
          mem_password: password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

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
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <a href="/" className=" flex items-center justify-center mb-8 text-5xl font-semibold lg:mb-7 dark:text-white">
        <Image
          alt="Flowbite logo"
          height="0"
          src="/../favicon.png"
          width="0"
          style={{ width: '100%', height: '100%' }}

        />

        <span >Flowbite</span>
      </a>
      <Card
        horizontal
        imgAlt=""
        className="w-full md:max-w-screen-sm lg:max-w-screen-md  [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Create a Free Account
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="name">Your name</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="John"
              autoComplete="name"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="lastname">Your last name</Label>
            <TextInput
              id="lastname"
              name="lastname"
              placeholder="Doe"
              autoComplete="lastname"
              type="text"
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="code">Your code</Label>
            <TextInput
              id="code"
              name="code"
              placeholder="Your code"
              type="text"
              autoComplete="code"
              onChange={(event) => setCode(event.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="phone">Your phone</Label>
            <TextInput
              id="phone"
              name="phone"
              placeholder="Your phone"
              type="text"
              autoComplete="phone"
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="location">Your location</Label>
            <TextInput
              id="location"
              name="location"
              placeholder="Your location"
              type="text"
              autoComplete="location"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <div className="mb-6 flex items-center gap-x-3">
            <Checkbox id="acceptTerms" name="acceptTerms" />
            <Label htmlFor="acceptTerms">
              I accept the&nbsp;
              <Link href="/terms" className="text-primary-700 dark:text-primary-200">
                Terms and Conditions
              </Link>
            </Label>
          </div>
          <div className="mb-7">
            <Button type="submit" className="w-full lg:w-auto">
              Create account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?&nbsp;
            <Link href="/#" className="text-primary-600 dark:text-primary-200">
              Login here
            </Link>
          </p>
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
      </Card>
    </div>
  );
};

export default SignUpPage;