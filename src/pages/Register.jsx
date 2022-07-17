import AuthPage from "components/AuthPage";
import { authType } from "assets/schemas/authFormValidation";
import Info from "components/Info";

const Register = () => {
  return (
    <AuthPage type={authType.registration}>
      <Info />
    </AuthPage>
  );
};

export default Register;
