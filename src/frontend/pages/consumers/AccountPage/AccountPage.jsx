import "@/global-styles/globals.css";
import styles from "./AccountPage.module.scss";
import ConsumerData from "@/frontend/components/consumers/AccountPageComponents/ConsumerData/ConsumerData";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import LikedProducts from "@/frontend/components/consumers/AccountPageComponents/LikedProducts/LikedProducts";
import { getUserAction } from "@/backend/entities/users/entry-points";
import { redirectToPage } from "@/backend/libs/next";

const AccountPage = async () => {
  const user = await getUserAction();
  if (!user) redirectToPage("/login");

  return (
    <div className={styles.container}>
      <ToPreviousPage title="Особистий кабінет" />
      <div className={styles.accoyntData}>
        <ConsumerData consumer={user} />
        <LikedProducts />
      </div>
    </div>
  );
};

export default AccountPage;
