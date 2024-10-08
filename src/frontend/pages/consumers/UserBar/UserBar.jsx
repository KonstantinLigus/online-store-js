"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./userBar.module.scss";
import { signOutAction } from "@/backend/entities/users/entry-points/signOut-action";
import Button from "@/frontend/components/consumers/Button/Button";
import Image from "next/image";

const UserBar = ({ token }) => {
  const { status } = useSession();

  const isFilled = () => {
    if (status === "unauthenticated" && !token) return false;
    if (status === "authenticated" || token) return true;
    return styles.userIconEmpty;
  };

  const getURL = () => {
    if (status === "unauthenticated" && !token) return "/login";
    if (status === "authenticated" || token) return "/account";
    return "/login";
  };

  const signOutClickHandler = async () => {
    if (status === "authenticated") signOut({ callbackUrl: "/login" });
    if (token) await signOutAction();
  };

  return (
    <div className={styles.userBarContainer}>
      {(status === "authenticated" || token) && (
        <Button
          onClick={signOutClickHandler}
          title="Вийти"
          className={styles.userSignOutBtn}
        />
      )}
      <Link href={getURL()}>
        <Image
          src={`/assets/icon/icon-person-${
            isFilled() ? "filled" : "outline"
          }.svg`}
          width={30}
          height={30}
          alt="cart icon"
          priority
          className={styles.cartIcon}
        />
      </Link>
      <Link href="/cart">
        <Image
          src="/assets/icon/icon-cart.svg"
          width={30}
          height={30}
          alt="cart icon"
          priority
          className={styles.cartIcon}
        />
      </Link>
    </div>
  );
};

export default UserBar;
