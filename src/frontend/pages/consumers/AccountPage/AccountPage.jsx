import "@/global-styles/globals.css";
import styles from "./AccountPage.module.scss";
import ConsumerData from "@/frontend/components/consumers/AccountPageComponents/ConsumerData/ConsumerData";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import LikedProducts from "@/frontend/components/consumers/AccountPageComponents/LikedProducts/LikedProducts";
import { updateUser } from "@/backend/entities/users/domain/updateUser-use-case";

const AccountPage = async () => {
  const user = await updateUser({});

  return (
    <div className={styles.container}>
      <ToPreviousPage title="Особистий кабінет" />
      <ConsumerData consumer={user} />
      <LikedProducts />
    </div>
  );
};

export default AccountPage;
