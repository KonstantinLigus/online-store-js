import "@/global-styles/globals.css";
import styles from "./AccountPage.module.scss";
import ConsumerData from "@/frontend/components/consumers/AccountPageComponents/ConsumerData/ConsumerData";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import UserData from "@/frontend/components/consumers/AccountPageComponents/UserData";
import LikedProducts from "@/frontend/components/consumers/AccountPageComponents/LikedProducts/LikedProducts";
import { getUserAction } from "@/backend/entities/users/entry-points";
import { redirectToPage } from "@/backend/libs/next";

const AccountPage = async () => {
  const user = await getUserAction();
  if (!user) redirectToPage("/login");

  return (
    <>
      <PathToPage pageTitle={"Особистий кабінет"} />
      <h1 className={styles.title}>Особистий кабінет</h1>
      <UserData user={user} />

      {/*<div className={styles.accoyntData}>
        <ConsumerData user={user} />
        <LikedProducts />
      </div>*/}
    </>
  );
};

export default AccountPage;
