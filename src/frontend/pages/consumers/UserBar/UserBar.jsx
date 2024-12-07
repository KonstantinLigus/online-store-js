"use client";

import { useSession } from "next-auth/react";
import styles from "./userBar.module.scss";
import IconLink from "@/frontend/components/consumers/IconLinkButton/IconLink";

const UserBar = ({ token }) => {
  const { status } = useSession();

  const isAuthenticated = () => {
    if (status === "unauthenticated" && !token) return false;
    if (status === "authenticated" || token) return true;
    return styles.userIconEmpty;
  };

  const getURL = () => {
    if (status === "unauthenticated" && !token) return "/login";
    if (status === "authenticated" || token) return "/account";
    return "/login";
  };

  return (
    <div className={styles.userBarContainer}>
      <IconLink
        icon={isAuthenticated() ? "personFilled" : "personOutline"}
        href={getURL()}
        ariaLabel="Увійти або зареєструватися"
      />
      <IconLink icon="cart" href="/cart" ariaLabel="Кошик" />
    </div>
  );
};

export default UserBar;
