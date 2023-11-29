import "./register.scss";
const IdentificationPage = () => {
  return (
    <div className="container">
      <h2>Реєстрація</h2>
      <form>
        <input placeholder="Ваше ім’я*" type="text" />
        <input placeholder="Ваше прізвище*" type="text" />
        <input placeholder="Телефон*" type="tel" />
        <input placeholder="E-mail*" type="email" />
        <input placeholder="Пароль*" type="password" />
        <input placeholder="Повторити пароль*" type="password" />
        <button type="submit">Зареєструватись</button>
      </form>
    </div>
  );
};
export default IdentificationPage;
