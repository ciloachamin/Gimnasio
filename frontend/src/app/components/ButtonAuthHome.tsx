import { signIn, useSession } from "next-auth/react";
import { Button, } from "flowbite-react";
import Link from "next/link";

export default function ButtonAuth() {
    const { data: session, status } = useSession();

    console.log({ session, status });

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        <>
            {session ? (
                <>
                    <Link href="/home">
                    <Button className="bg-[#7F9115] fitness-club text-white rounded hover:bg-[#232811]">
                        Ingresar
                    </Button>
                    </Link>
                </>
            ) : (
                <>
                    <Button onClick={() => signIn()} className='bg-[#7F9115] fitness-club text-white rounded hover:bg-[#647C10]'>
                        Sing in
                    </Button>
                </>
            )}
        </>
    );
}
