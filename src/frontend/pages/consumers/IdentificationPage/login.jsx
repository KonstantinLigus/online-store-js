import Link from "next/link";
import Image from "next/image";
import googleIcon from "public/assets/icon/icon-google.svg";
import "./login.scss";
const LoginPage = () => {
  return (
    <div className="container">
      <h2>Вхід особистого кабінету</h2>
      <form>
        <label>
          Email:
          <input placeholder="name@gmail.com" type="email" />
        </label>
        <label>
          Пароль:
          <input placeholder="*********" type="password" />
        </label>
        <button type="submit">Увійти</button>
      </form>
      <div className="nav-fomr">
        <Link href="/">Забули пароль?</Link>
        <Link href="register">Зареєструватись</Link>
      </div>
      <label className="google-auth" htmlFor="">
        Також можна увійти через:
        <button>
          <Image alt="logo-img" src={googleIcon} width={24} height={24}></Image>{" "}
          Google
        </button>
      </label>
    </div>
  );
};
export default LoginPage;
