import AuthForm from "components/AuthForm";
import Quote from "components/Quote";
// import s from "./LoginPage";

const LoginPage = () => {
  return (
    <div>
      <AuthForm type="login" />
      <Quote />
    </div>
  );
};

export default LoginPage;
