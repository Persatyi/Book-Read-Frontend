import AuthPage from "components/AuthPage";
import { authType } from "assets/schemas/authFormValidation";
import Quote from "components/Quote";

const Login = () => {
  return (
    <AuthPage type={authType.login}>
      <Quote />
    </AuthPage>
  );
};

export default Login;
