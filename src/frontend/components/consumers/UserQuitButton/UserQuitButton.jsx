import { signOut, useSession } from "next-auth/react";
import { signOutAction } from "@/backend/entities/users/entry-points";

const UserQuitButton = ({ token, className }) => {
  const { status } = useSession();

  const signOutClickHandler = async () => {
    if (status === "authenticated") signOut({ callbackUrl: "/login" });
    if (token) await signOutAction();
  };

  return (
    <button onClick={signOutClickHandler} className={className}>
      Вийти
    </button>
  );
};

export default UserQuitButton;
