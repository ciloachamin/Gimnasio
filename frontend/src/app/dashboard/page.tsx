"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState([]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getCats = async () => {
    const res = await fetch(`${backendUrl}/owner`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    setCats(data);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";

    // Redirige a la página de inicio después de cerrar sesión
  };


  return (
    <div>
      <button onClick={handleSignOut}>
        sALIR 
      </button>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button
        onClick={getCats}
        className="btn btn-primary"
      >
        Get Cats
      </button>
      <pre>
        <code>{JSON.stringify(cats, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Dashboard;
