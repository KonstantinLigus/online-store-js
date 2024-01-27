"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./userBar.module.scss";
import { signOutAction } from "@/backend/entities/users/entry-points/signOut-action";

const UserBar = ({ token }) => {
  const { status } = useSession();

  const getStyles = (status, token) => {
    if (status === "unauthenticated" && !token) return styles.userIconEmpty;
    if (status === "authenticated" || token) return styles.userIconFilled;
  };

  const signOutClickHandler = async () => {
    if (status === "authenticated") signOut({ callbackUrl: "/login" });
    if (token) await signOutAction();
  };

  return (
    <>
      {(status === "authenticated" || token) && (
        <button onClick={signOutClickHandler}>Sign out</button>
      )}
      {status === "loading" && <p className={styles.userInfo}>Loading...</p>}
      <Link href="/login">
        <svg width={24} height={24} className={getStyles(status, token)}>
          <use href="assets/icon/user-icon.svg#user" />
        </svg>
      </Link>
    </>
  );
};

export default UserBar;
