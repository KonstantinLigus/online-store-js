"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const UserBar = () => {
  const { data, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <>
          <p>Signed in as {data.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}
    </>
  );
};

export default UserBar;
