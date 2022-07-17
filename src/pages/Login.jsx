import AuthPage from "components/AuthPage";
import { authType } from "assets/schemas/authFormValidation";

const Login = () => {
  return <AuthPage type={authType.login} />;
};

export default Login;
