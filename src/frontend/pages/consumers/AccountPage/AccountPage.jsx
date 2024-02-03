// "use client";
import "@/global-styles/globals.css";
import styles from "./AccountPage.module.scss";
import ConsumerData from "@/frontend/components/consumers/AccountPageComponents/ConsumerData/ConsumerData";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import { getServerSession } from "next-auth";
import { userServices } from "@/backend/entities/users/data-access/userServices";
import authOptions from "@/backend/libs/next-auth/authOptions";
import { getCookie } from "@/backend/libs/next";
import { verifyToken } from "@/backend/libs/jwt";
import LikedProducts from "@/frontend/components/consumers/AccountPageComponents/LikedProducts/LikedProducts";

const AccountPage = async () => {
  let user = null;
  const session = await getServerSession(authOptions);
  if (session) {
    user = await userServices.getUserByField({
      _id: session.user._id.toString(),
    });
  }
  const token = await getCookie("token");
  if (!session && token) {
    const userId = verifyToken(token.value)._id;
    user = await userServices.getUserByField({ _id: userId });
  }
  delete user._id;
  delete user.password;
  delete user.verificationToken;

  // const searchParams = useSearchParams();
  // const userId = searchParams.get("_id");
  // const res = fetch("api/");
  // const [consumerInfo, setConsumerInfo] = useState({
  //   firstName: "Сергій",
  //   secondName: "Іванович",
  //   surname: "Іванчук",
  //   customerPhone: "+380 50 111 22 22",
  //   email: "mail@mail.com",
  //   birthday: "2000-01-01",
  //   deliveryType: "Нова Пошта - Відділення",
  //   region: "Київська",
  //   city: "Київ",
  //   postOffice: "Відділення №1: вул. Пирогівський шлях, 135",
  //   street: "",
  //   house: "",
  //   flat: "",
  //   oldPassword: "",
  //   newPassword: "",
  //   newPasswordRepeat: "",
  // });

  return (
    <div className={styles.container}>
      <ToPreviousPage title="Особистий кабінет" />
      <ConsumerData consumer={user} />
      <LikedProducts />
    </div>
  );
};

export default AccountPage;
