import AuthPagePage from "components/AuthPage";
import { authType } from "assets/schemas/authFormValidation";

const Register = () => {
  return <AuthPagePage type={authType.registration} />;
};

export default Register;
