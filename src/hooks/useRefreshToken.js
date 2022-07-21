import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  token,
  getRefreshToken,
  resetTokens,
  setIsAuth,
  loggedOff,
} from "redux/auth";
import { useRefreshTokenMutation } from "redux/api/bookAPI";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentToken = useSelector(token);
  const refreshToken = useSelector(getRefreshToken);
  const [updateTokens] = useRefreshTokenMutation();

  const checkRefreshToken = async () => {
    const isExpired = new Date() > new Date(jwt_decode(currentToken).exp);

    if (!isExpired) return;

    try {
      const tokens = await updateTokens({ refreshToken }).unwrap();
      dispatch(resetTokens(tokens));
      dispatch(setIsAuth(true));
    } catch (error) {
      dispatch(loggedOff());
    }
  };
  return checkRefreshToken;
};
export default useRefreshToken;
